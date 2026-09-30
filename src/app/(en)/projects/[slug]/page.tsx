import { createProjectDetailRoute } from "@/lib/routes/project-detail-route";

const route = createProjectDetailRoute("en");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.ProjectDetailPage;
