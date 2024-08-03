/** @type {import('next').NextConfig} */
// const nextConfig = {};

module.exports = {
  rewrites: () => [
    {
      source: "/api",
      destination: "http://localhost:3000/api",
    },
  ],
}

// export default nextConfig;
