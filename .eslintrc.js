module.exports = {
  extends: '@funboxteam',
  globals: {
    Phaser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack/base.config.js',
      },
    },
  },
};
