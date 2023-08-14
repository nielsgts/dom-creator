module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|mts|js|mjs)",
    "**/?(*.)+(spec|test).+(ts|tsx|mts|js|mjs)"
  ],
  transform: {
    "^.+\\.(ts|tsx|mts)$": ["ts-jest",
      {
        "useESM": true
      }
    ]
  },
}
