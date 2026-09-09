# seanchoi.space

My personal portfolio and technical blog, built with Next.js, TypeScript, and React. It combines a Notion-to-MDX publishing workflow, interactive code examples, PostgreSQL view counts, and a Gemini chatbot configured to answer questions about my background and projects.

[Visit seanchoi.space](https://seanchoi.space)

## Features

- **Notion publishing:** A sync script converts published Notion pages into local MDX files and saves their images in the repository. The site reads blog content from `content/`.
- **Interactive examples:** Blog posts can embed code sandboxes through `@codesandbox/sandpack-react`.
- **Portfolio chatbot:** A server-side Gemini integration uses curated portfolio facts and conversation history. Its context is configured in `app/api/chat/route.ts`.
- **Analytics and view counts:** Vercel Analytics and Speed Insights provide traffic and performance instrumentation; PostgreSQL stores per-post view counts.
- **Content automation:** A GitHub Actions workflow syncs Notion content daily and supports manual runs.

## Tech Stack

| Area | Technology |
| --- | --- |
| Application | Next.js App Router, React, TypeScript |
| Styling | Tailwind CSS |
| Publishing | Notion API, `notion-to-md`, MDX |
| Interactive examples | Sandpack |
| AI chat | Google Gemini via `@google/generative-ai` |
| View counts | PostgreSQL via `postgres` |
| Analytics | Vercel Analytics and Speed Insights |
| Hosting | Vercel |
| Tests | Vitest |

## Running Locally

Use Node.js 22, matching the content-sync workflow, and npm.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/se4nchoi/seanchoi.space.git
   cd seanchoi.space
   npm ci
   ```

2. Create `.env.local` in the repository root:

   ```dotenv
   POSTGRES_URL=
   GEMINI_API_KEY=

   # Required only when syncing your own Notion content
   NOTION_INTEGRATION_SECRET=
   NOTION_DATASOURCE_ID=
   ```

   Set `POSTGRES_URL` to your PostgreSQL connection string for blog view tracking. Set `GEMINI_API_KEY` to enable chat. Existing blog posts are checked into `content/`, so displaying them does not require Notion credentials.

3. In your development database, create the table used by the view-count queries:

   ```sql
   CREATE TABLE IF NOT EXISTS views (
     slug TEXT PRIMARY KEY,
     count BIGINT NOT NULL DEFAULT 0
   );
   ```

   Blog detail pages increment this table when rendered, so configure the database before testing those pages.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Syncing Notion Content

To publish from your own Notion data source, give your Notion integration access and configure the two `NOTION_*` variables above. The sync script expects these properties:

| Property | Notion type / value |
| --- | --- |
| `Title` | Title |
| `Status` | Status, with a `Published` option |
| `PublishedAt` | Date |
| `Summary` | Rich text |
| `Slug` | Rich text; falls back to the title when empty |
| `ID` | Unique ID |

Run the sync from the repository root:

```bash
npm run build:scripts
node dist/scripts/fetchNotionContents.js
```

The script writes MDX to `content/`, downloads images to `public/notion-images/`, and records sync timestamps in `content/notion-sync.json`. Review the generated files before committing them.

For scheduled syncs, configure `NOTION_INTEGRATION_SECRET` and `NOTION_DATASOURCE_ID` as GitHub Actions repository secrets. The [workflow](.github/workflows/notion-content-sync.yaml) runs daily at 04:00 KST and commits content updates.

## Development Commands

```bash
npm test       # Run the existing Vitest tests
npm run build  # Build the production app
npm start      # Serve the production build
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- **Website:** [seanchoi.space](https://seanchoi.space)
- **GitHub:** [@se4nchoi](https://github.com/se4nchoi)
