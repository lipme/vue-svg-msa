module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:vue/essential', '@vue/airbnb'],
  plugins: ['prettier'],
  rules: {
    // 'import/no-useless-path-segments': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
