import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';

import dotenv from 'dotenv';
import path from 'path';

// Only load dotenv in a development environment.
// The CI environment on GitHub Actions will provide the secrets directly.
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(import.meta.dirname, '../.env.local') });
}

// Now you can safely access your variables, which will be available
// either from the .env.local file (locally) or from the GitHub Actions secrets.
const notionIntegrationSecret = process.env.NOTION_INTEGRATION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionIntegrationSecret });
const n2m = new NotionToMarkdown({ notionClient: notion });
const databaseId = notionDatabaseId!;

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