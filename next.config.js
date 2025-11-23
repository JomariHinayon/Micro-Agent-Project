/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC to avoid binary issues on Windows
  compiler: {
    // Use Babel instead of SWC if SWC fails
  },
}

module.exports = nextConfig
