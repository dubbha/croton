module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
    'plugin:mocha/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'mocha'],
  rules: {
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always', { arraysInObjects: false }],
    'no-unused-vars': 'off',
    'mocha/no-global-tests': 'off',
    'mocha/no-mocha-arrows': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
  },
};