const nextConfig = {
  allowedDevOrigins: process.env.DEV_ORIGIN_IP ? [process.env.DEV_ORIGIN_IP] : [],
}

module.exports = nextConfig
