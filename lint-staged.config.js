module.exports = {
  linters: {
    '*.js': ['prettier-eslint --write', 'git add', 'jest --findRelatedTests'],
  },
};
