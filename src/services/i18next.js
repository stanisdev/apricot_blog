'use strict';

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const path = global.config.directories.locales;

i18next
  .use(Backend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path + '/{{lng}}/{{ns}}.json',
      addPath: path + '/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en'],
    saveMissing: true
  });

module.exports = i18nextHttpMiddleware.handle(i18next, {});