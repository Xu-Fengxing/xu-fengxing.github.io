/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 禁用 Next.js 开发工具
  devIndicators: {
    position: 'bottom-right',
  },
  // 禁用 React 开发工具
  reactStrictMode: false,
}

export default nextConfig
