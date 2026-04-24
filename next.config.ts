import type { NextConfig } from "next";

/**
 * Block shipping a build with auth disabled on production-like branches (Amplify
 * sets `AWS_BRANCH`) or when CI sets `ENFORCE_PROD_AUTH=true`.
 */
const assertProdAuthNotDisabled = () => {
  if (process.env.NEXT_PUBLIC_AUTH_DISABLED !== "true") {
    return;
  }
  const branch = (process.env.AWS_BRANCH ?? "").trim();
  const prodBranch =
    branch === "main" ||
    branch === "master" ||
    branch === "production" ||
    branch === "prod";
  if (prodBranch || process.env.ENFORCE_PROD_AUTH === "true") {
    throw new Error(
      `[next.config] NEXT_PUBLIC_AUTH_DISABLED must not be "true" when ` +
        `AWS_BRANCH is a production branch (current: "${branch || "(unset)"}") ` +
        `or ENFORCE_PROD_AUTH=true.`,
    );
  }
};

assertProdAuthNotDisabled();

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
