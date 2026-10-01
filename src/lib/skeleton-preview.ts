import { isPreviewChannel } from "./release-channel";

/** Synthetic fixtures and review pages follow the preview channel. */
export function isSkeletonPreviewEnabled(
  env: Pick<NodeJS.ProcessEnv, "NODE_ENV" | "VERCEL_ENV"> = process.env as Pick<
    NodeJS.ProcessEnv,
    "NODE_ENV" | "VERCEL_ENV"
  >,
): boolean {
  return isPreviewChannel(env);
}
