module.exports = ({ env })=>({
  upload: {
    config: {
      sizeLimit: 10 * 1024 * 1024,
      providerOptions: {
        localServer: {
          maxage: 31536000
        },
      },
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
});
