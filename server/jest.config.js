/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // "/^@/(.*)$/": "<rootDir>/src/$1",
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  resolver: undefined,
};
