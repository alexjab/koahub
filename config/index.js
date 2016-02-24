module.exports = {
  urls: {
    base: process.env.BASE_URL || 'https://api.koahub.com',
  },
  versions: {
    current: process.env.CURRENT_VERSION || 'v1',
    all: ['v1']
  },
  env: process.env.NODE_ENV,
  vendor: {
    names: {
      camel: process.env.VENDOR_CAMEL_NAME || 'KoaHub',
      safe: process.env.VENDOR_SAFE_NAME || 'KoaHub.com',
      snake: process.env.VENDOR_SNAKE_NAME || 'koahub',
    },
    domain: process.env.VENDOR_DOMAIN || 'koahub.com'
  }
};
