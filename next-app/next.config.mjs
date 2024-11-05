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
    // env: {
    //     BACKEND_API_URL: 'http://localhost:5000/',
    // },
};

export default nextConfig;
