/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    localeDetection: false,
  },
  defaultNS: 'common',
  localePath: './public/locales',
}
