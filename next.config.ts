import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // สำหรับ GitHub Pages
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

export default nextConfig;
