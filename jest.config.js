export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.js'];
export const transform = {
  '^.+\\.jsx?$': 'babel-jest',
  '\\.(css|less)$': 'jest-transform-stub'
};