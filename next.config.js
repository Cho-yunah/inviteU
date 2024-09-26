/** @type {import('next').NextConfig} */
const nextConfig = {};


module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ]
  }
}


// distDir: "_next",
//   generateBuildId: async () => {
//     if (process.env.BUILD_ID) {
//       return process.env.BUILD_ID;
//     } else {
//       return `${new Date().getTime()}`;
//     }
//   },