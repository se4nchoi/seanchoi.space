# seanchoi.space

This is my personal website and blog, built with Next.js and using Notion as a CMS.

## Features

*   **Blog with Notion:** The blog posts are fetched from a Notion database, using `notion-to-md` to convert the content to Markdown.
*   **Code Sandboxes:** The blog posts can include interactive code sandboxes using `@codesandbox/sandpack-react`.
*   **Analytics:** The website uses Vercel Analytics and Speed Insights to track user traffic and performance.
*   **CI/CD:** The website is automatically deployed to Vercel, and the Notion content is synced using a GitHub Actions workflow.
*   **AI Chatbot:** This site features an AI chatbot (powered by Gemini and ##) that can be configured to give visitors detailed answers to questions tailored to the portfolio projects, career aspirations and stories, fit, and more.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **CMS:** [Notion](https://www.notion.so/)
*   **AI Chat, RAG:** [Google Gemini](https://gemini.google.com)
*   **Database:** [Vercel Postgres (NEON)](https://vercel.com/storage/postgres)
*   **Deployment:** [Vercel](https://vercel.com/)

## Running Locally

1.  Clone the repository:

    ```bash
    git clone https://github.com/se4nchoi/seanchoi.space.git
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env.local` file and add the following environment variables:

    ```bash
    NOTION_INTEGRATION_SECRET=
    NOTION_DATASOURCE_ID=
    POSTGRES_URL=
    GEMINI_API_KEY=
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

*   **Website:** [seanchoi.space](https://seanchoi.space)
*   **GitHub:** [@se4nchoi](https://github.com/se4nchoi)