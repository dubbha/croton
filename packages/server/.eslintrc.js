module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        quotes: [2, 'single'],
        'object-curly-spacing': [2],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error'
    },
};
