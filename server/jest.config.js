/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  resolver: undefined,
  moduleNameMapper: {
    "/^@/(.*)$/": "/src/$1",
  },
};
