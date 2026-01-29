/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async redirects() {
        return [
          {
            source: '/plot/:slug',
            destination: '/plot',
            permanent: true,
          },
        ]
    },
};

export default nextConfig;
