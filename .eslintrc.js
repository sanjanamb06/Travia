// Basic ESLint configuration for Node.js project
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Error prevention
    'no-unused-vars': 'warn',
    'no-console': 'off', // Allow console.log in development
    'no-undef': 'error',
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    
    // Best practices
    'eqeqeq': 'error',
    'no-var': 'error',
    'prefer-const': 'error'
  }
};