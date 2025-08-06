import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const databaseId = process.env.NOTION_DATABASE_ID!;

async function fetchPublishedPages() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Status',
      status: {
        equals: 'Published',
      },
    },
  });
  if (!response.results || response.results.length === 0) {
    console.log('No published pages found.');
    return;
  }

  for (const page of response.results) {
  const props = (page as any).properties;
  const title = props.Title.title[0]?.plain_text || 'untitled';
  const publishedAt = props.PublishedAt?.date?.start || '';
  const summary = props.Summary?.rich_text[0]?.plain_text || '';
  const image = props.Image?.url || '';
  const slug = props.Slug?.rich_text?.[0]?.plain_text
    ? sanitizeSlug(props.Slug.rich_text[0].plain_text)
    : sanitizeSlug(title);
    
  // Build frontmatter block
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

  const fileName = `${title.replace(/\s+/g, '-').toLowerCase()}.mdx`;
  fs.writeFileSync(
    path.join('content', fileName),
    `${frontmatter}\n\n${markdown}`
  );
  console.log(`Wrote: content/${fileName}`);
}
};

function sanitizeSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '');    // trim leading/trailing hyphens
}


fetchPublishedPages().catch(console.error);