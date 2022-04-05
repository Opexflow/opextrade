module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'ru', 'tr'],
        defaultLocale: 'ru'
    },
    eslint: {
        ignoreDuringBuilds: true
    }

    // async redirects() {
    //   return [
    //     {
    //       source: '/ru',
    //       destination: `/`,
    //       permanent: false,
    //       locale: false,
    //     },
    //     {
    //       source: '/with-locale',
    //       destination: `/`,
    //       permanent: false,
    //     },
    //   ];
    // },
};
