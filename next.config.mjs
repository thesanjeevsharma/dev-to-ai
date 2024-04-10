/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "media.dev.to",
        pathname: "**",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
