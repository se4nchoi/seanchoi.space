import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(import.meta.dirname, '../.env.local') });


const notion = new Client({ auth: process.env.NOTION_INTEGRATION_SECRET });
const n2m = new NotionToMarkdown({ notionClient: notion });
const databaseId = process.env.NOTION_DATABASE_ID!;

function sanitizeSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchPublishedPages() {
  const syncLogPath = path.join('content', 'notion-sync.json');
  let syncLog: Record<string, string> = {};
  if (fs.existsSync(syncLogPath)) {
    syncLog = JSON.parse(fs.readFileSync(syncLogPath, 'utf-8'));
  }

  const response = await notion.databases.query({
    database_id: databaseId,
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
    const filePath = path.join('content', `${slug}.mdx`);

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