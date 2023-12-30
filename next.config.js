/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/",
                destination: "https://hcb.hackclub.com/wrapped",
                permanent: false
            }
        ];
    }
};

module.exports = nextConfig;
