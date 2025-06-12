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
    //   NEXT_PUBLIC_FRONTEND_IMAGE: "ghcr.io/scilifelabdatacentre/kiarva-frontend:0.8.0",
    //   NEXT_PUBLIC_BACKEND_IMAGE: "ghcr.io/scilifelabdatacentre/kiarva-backend:0.12.2",
    // },
};

export default nextConfig;
