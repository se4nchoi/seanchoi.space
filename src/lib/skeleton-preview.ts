export function isSkeletonPreviewEnabled(
  env: Pick<NodeJS.ProcessEnv, "NODE_ENV" | "VERCEL_ENV"> = process.env as Pick<
    NodeJS.ProcessEnv,
    "NODE_ENV" | "VERCEL_ENV"
  >,
): boolean {
  return env.NODE_ENV === "development" || env.VERCEL_ENV === "preview";
}
