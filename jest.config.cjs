module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
  setupFiles: ['<rootDir>/tests/setup-envs.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/tests/$1',
    '^axios$': '<rootDir>/node_modules/axios/dist/axios.min.js',
    '^axios/(.*)$': '<rootDir>/node_modules/axios/$1',
  },
  restoreMocks: true,
};
