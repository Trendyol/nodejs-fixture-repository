module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/index.ts', 'src/globals.d.ts', 'src/types'],
  testPathIgnorePatterns: ['./__tests__/models/'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFiles: ['<rootDir>/jestSetup.js']
};
