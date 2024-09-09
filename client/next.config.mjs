import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import ("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "/src/(FSD)/shareds/styles")],
    },
    i18n: {
        locales: ["ko-KR"],
        defaultLocale: "ko-KR",
    },
    images: {
        domains: ['xenoimages12341234.s3.ap-northeast-2.amazonaws.com'],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;