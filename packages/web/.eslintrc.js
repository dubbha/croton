module.exports = {
  extends: ['airbnb', 'plugin:react-hooks/recommended', '../core/.eslintrc'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-undef': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['src/setupTests.ts', '**/*.test.ts*'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          'elements',
          'components',
          'pages',
          'store',
          'config',
          'services',
          'hooks',
          'helpers',
          'constants',
        ]
      }
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'react/prop-types': 'off',
    'consistent-return': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts*'],
      rules: {
        'jsx-a11y/control-has-associated-label': 'off',
        'react/button-has-type': 'off',
        'prefer-promise-reject-errors': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-shadow': 'off',
        'dot-notation': 'off',
      },
    },
  ],
};
