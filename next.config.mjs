/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        hostname: 'barbershops.s3.us-east-2.amazonaws.com',
      },
      {
        hostname: 'ui-avatars.com',
      },
    ],
  },
}

export default nextConfig
