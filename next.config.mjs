/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/my-pwa-app' : '',
  assetPrefix: isProd ? '/my-pwa-app/' : '',
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
