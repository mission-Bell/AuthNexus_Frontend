/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // クライアントサイドでは canvas モジュールを無視する
      config.resolve.alias.canvas = false;
    }
    return config;
  },
  
};

export default nextConfig;
