/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: { dynamic: 0 }
    },
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
            },
        ],
    },
};

export default nextConfig;
