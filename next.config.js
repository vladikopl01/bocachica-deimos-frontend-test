/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    infuraKey: process.env.INFURA_KEY,
  },
}

module.exports = nextConfig
