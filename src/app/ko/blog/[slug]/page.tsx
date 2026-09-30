import { createBlogArticleRoute } from "@/lib/routes/blog-article-route";

const route = createBlogArticleRoute("ko");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.BlogArticlePage;
