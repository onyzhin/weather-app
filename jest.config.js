const tsJestPreset = require('jest-preset-angular/jest-preset').globals['ts-jest'];

module.exports = {
  preset: 'jest-preset-angular',
  modulePaths: ['<rootDir>'],
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  setupFilesAfterEnv: ['<rootDir>/testing/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ng-bootstrap))'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/localdeps/',
    '/src/testing/',
    '/src/environments/'
  ],
  globals: {
    'ts-jest': {
      ...tsJestPreset,
      tsConfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  modulePathIgnorePatterns: ['<rootDir>/coverage/']
};
