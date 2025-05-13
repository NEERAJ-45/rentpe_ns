/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js","jsx","ts","tsx","json","node"],
  roots: ["<rootDir>/src"]
};