/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: ['src/*.test.tsx'],
  mutator: 'typescript',
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app',
  },
  tempDirName: 'stryker-tmp',
};
