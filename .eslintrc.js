module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['src/*'],
      env: {
        browser: true,
      },
    },
    {
      files: ['test/*'],
      env: {
        node: true,
        jest: true,
      },
    },
  ],
  parser: 'babel-eslint',
};
