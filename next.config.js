/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  images: {
    domains: [
      //@FIXME здесь должен быть мой домен для продакшена
      'localhost',
    ],
  },
}

module.exports = nextConfig
