/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  // mutate: ['src/*.test.tsx'],
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec).ts?(x)',
    '!src/**/index.ts?(x)',
  ],
  mutator: 'typescript',
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app',
  },
  tempDirName: 'stryker-tmp',
};
