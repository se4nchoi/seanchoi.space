import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
// otherwise load env from github actions
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(process.cwd(), '.env.local') });
}

const contentDir = path.join(process.cwd(), 'content');

const notionIntegrationSecret = process.env.NOTION_INTEGRATION_SECRET;
const notionDataSourceId = process.env.NOTION_DATASOURCE_ID;

const notion = new Client({ 
  auth: notionIntegrationSecret,
  notionVersion: '2025-09-03',
 });
const n2m = new NotionToMarkdown({ notionClient: notion });
const dataSourceId = notionDataSourceId!;

const sanitizeSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const fetchPublishedPages = async () => {
  const syncLogPath = path.join(contentDir, 'notion-sync.json');
  let syncLog: Record<string, string> = {};
  if (fs.existsSync(syncLogPath)) {
    syncLog = JSON.parse(fs.readFileSync(syncLogPath, 'utf-8'));
  }

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'Status',
      status: { equals: 'Published' },
    },
  });

  for (const page of response.results) {
    if (page.object !== 'page' || !('properties' in page)) continue;
    const props = page.properties as Record<string, any>;

    const title = props.Title?.title?.[0]?.plain_text || 'untitled';
    const publishedAt = props.PublishedAt?.date?.start || '';
    const summary = props.Summary?.rich_text?.[0]?.plain_text || '';
    const image = props.Image?.url || '';
    const slug = props.Slug?.rich_text?.[0]?.plain_text
      ? sanitizeSlug(props.Slug.rich_text[0].plain_text)
      : sanitizeSlug(title);

    const lastEdited = page.last_edited_time;
    const filePath = path.join(contentDir, `${slug}.mdx`);

    const frontmatter = [
      '---',
      `title: "${title}"`,
      `slug: "${slug}"`,
      publishedAt ? `publishedAt: "${publishedAt}"` : '',
      summary ? `summary: "${summary}"` : '',
      image ? `image: "${image}"` : '',
      '---'
    ].filter(Boolean).join('\n');

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdBlocks);
    const markdown =
      typeof mdString === 'string'
        ? mdString
        : [mdString.parent, ...(Array.isArray(mdString.children) ? mdString.children : [])].join('\n\n');

    const newContent = `${frontmatter}\n\n${markdown}`;

    if (
      !syncLog[slug] ||
      new Date(lastEdited).getTime() > new Date(syncLog[slug]).getTime()
    ) {
      fs.writeFileSync(filePath, newContent);
      syncLog[slug] = lastEdited;
      console.log(`Wrote: ${filePath}`);
    } else {
      console.log(`Skipped (no Notion changes): ${filePath}`);
    }
  }

  fs.writeFileSync(syncLogPath, JSON.stringify(syncLog, null, 2));
}

fetchPublishedPages().catch(console.error);