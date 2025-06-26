/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async redirects() {
        return [
          {
            source: '/plot',
            destination: '/plot/genomic',
            permanent: true,
          },
        ]
    },
};

export default nextConfig;
