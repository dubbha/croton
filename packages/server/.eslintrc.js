module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        quotes: [2, 'single'],
        'object-curly-spacing': [2]
    },
};
