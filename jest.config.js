module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.{ts,tsx}',
    '!<rootDir>/src/app/main/**/*',
    '!<rootDir>/src/app/presentation/components/router/**/*',
    '!<rootDir>/src/app/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/app/main/config/jest-setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/main/tests/cypress'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1'
  },
  clearMocks: true
}
