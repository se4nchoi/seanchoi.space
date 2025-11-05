import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^next/image$': '<rootDir>/__mocks__/image.tsx',
    '^next/link$': '<rootDir>/__mocks__/link.tsx',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-mdx-remote|next|react-tweet|sugar-high)/)',
  ],
}
 
export default createJestConfig(config)