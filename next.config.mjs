/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache WebP animation frames dài hạn — immutable vì filename theo số thứ tự cố định
  async headers() {
    return [
      {
        source: "/frames/footage-webp/:filename*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
