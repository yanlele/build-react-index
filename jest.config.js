const path = require('path');
module.exports = {
  rootDir: path.resolve(__dirname),
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  collectCoverage: true,
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "clover"
  ],
  coverageDirectory: "<rootDir>/coverage-client",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 60,
      lines: 80,
      statements: 80
    }
  }
};

