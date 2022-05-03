module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = { fs: false };
      config.resolve.fallback = { dns: false };
      config.resolve.fallback = { tls: false };
      config.resolve.fallback = { net: false };
    }
    return config;
  },
  reactStrictMode: true,
};
