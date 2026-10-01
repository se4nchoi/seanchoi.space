type ChannelEnv = Pick<NodeJS.ProcessEnv, "NODE_ENV" | "VERCEL_ENV">;

/**
 * The preview channel (local dev and Vercel preview deployments such as
 * dev.seanchoi.space) shows content still awaiting Sean's approval.
 * Production (seanchoi.space) shows approved content only.
 */
export function isPreviewChannel(env: ChannelEnv = process.env as ChannelEnv): boolean {
  return env.NODE_ENV === "development" || env.VERCEL_ENV === "preview";
}
