/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jacopngdwpoypvunhunq.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
