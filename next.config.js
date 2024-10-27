const nextConfig = {
  async rewrites() {
    const destinationBaseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://invite-u.vercel.app'
        : 'http://localhost:3000'

    return [
      {
        source: '/api/:path*',
        destination: `${destinationBaseUrl}/api/:path*`,
      },
    ]
  },
  env: {
    NEXT_PUBLIC_INVITATION_BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://invite-u.vercel.app'
        : 'http://localhost:3000',
  },
}

module.exports = nextConfig
