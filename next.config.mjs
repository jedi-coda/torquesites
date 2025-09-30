/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // optional: if TS type *errors* ever block builds, uncomment the next line
  // typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
