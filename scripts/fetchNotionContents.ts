import { Client, collectPaginatedAPI } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';

// Load environment variables from .env.local in non-production environments
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(process.cwd(), '.env.local') });
}
const contentDir = path.join(process.cwd(), 'content');
const imageDir = path.join(process.cwd(), 'public', 'notion-images');

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

const downloadImage = async (url: string, filepath: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
  } catch (error) {
    console.error(`Error downloading image ${url}:`, error);
  }
};

const fetchPublishedPages = async () => {
  const syncLogPath = path.join(contentDir, 'notion-sync.json');
  let syncLog: Record<string, string> = {};
  if (fs.existsSync(syncLogPath)) {
    syncLog = JSON.parse(fs.readFileSync(syncLogPath, 'utf-8'));
  }

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
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
    const slug = props.Slug?.rich_text?.[0]?.plain_text
      ? sanitizeSlug(props.Slug.rich_text[0].plain_text)
      : sanitizeSlug(title);
    const pageID = props?.ID || 'no-id';
    const uniqueId = pageID ? props.ID.unique_id.prefix+'-'+props.ID.unique_id.number : 'no-id';

    const lastEdited = page.last_edited_time;
    const filePath = path.join(contentDir, `${slug}.mdx`);

    const needsUpdate = !syncLog[uniqueId] || new Date(lastEdited).getTime() > new Date(syncLog[uniqueId]).getTime();

    if (needsUpdate) {
      n2m.setCustomTransformer("image", async (block) => {
        const { image } = block as any;
        const imageUrl = image.file.url;
        const blockId = block.id;
        
        try {
          const url = new URL(imageUrl);
          const extension = path.extname(url.pathname);

          // Create a directory for the page's images
          const pageImageDir = path.join(imageDir, uniqueId);
          if (!fs.existsSync(pageImageDir)) {
            fs.mkdirSync(pageImageDir, { recursive: true });
          }

          const localImageFilename = `${blockId}${extension}`;
          const localImageFilepath = path.join(pageImageDir, localImageFilename);
          
          await downloadImage(imageUrl, localImageFilepath);
          const localImagePath = `/notion-images/${uniqueId}/${localImageFilename}`;
          console.log(`Downloaded image for ${uniqueId} to ${localImagePath}`);
          
          const imageCaption = image.caption.map((c: any) => c.plain_text).join('');
          return `![${imageCaption}](${localImagePath})`;
        } catch (e) {
          console.error(`Failed to process image for ${uniqueId}:`, e);
          return false;
        }
      });

      const frontmatter = [
        '---',
        `title: "${title}"`,
        `slug: "${slug}"`,
        publishedAt ? `publishedAt: "${publishedAt}"` : '',
        summary ? `summary: "${summary}"` : '',
        '---'
      ].filter(Boolean).join('\n');

      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdString = n2m.toMarkdownString(mdBlocks);
      const markdown =
        typeof mdString === 'string'
          ? mdString
          : [mdString.parent, ...(Array.isArray(mdString.children) ? mdString.children : [])].join('\n\n');
      
      const newContent = `${frontmatter}\n\n${markdown}`;
      fs.writeFileSync(filePath, newContent);
      syncLog[uniqueId] = lastEdited;
      console.log(`Wrote: ${filePath}`);
    } else {
      console.log(`Skipped (no Notion changes): ${filePath}`);
    }
  }

  fs.writeFileSync(syncLogPath, JSON.stringify(syncLog, null, 2));
}

fetchPublishedPages().catch(console.error);