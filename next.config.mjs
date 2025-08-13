/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['mongoose'],
    images: {
        domains: ['lh3.googleusercontent.com', "res.cloudinary.com"],
    },
};

export default nextConfig;
