module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': ['error'],
    'no-var': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': ['error'],
    'linebreak-style': ['error', 'unix'],
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'no-empty': ['error'],
    'no-irregular-whitespace': ['error'],
    'no-useless-constructor': ['error'],
    'comma-dangle': ['error'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'indent': ['error', 2],
    'no-console': ['warn'],
    'default-case': ['error'],
    'no-alert': ['error'],
    'camelcase': ['error'],
    'arrow-spacing': ['error'],
    'no-duplicate-imports': ['error'],
    'prefer-spread': ['error'],
    'require-jsdoc': ['warn', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true,
        'ArrowFunctionExpression': true,
        'FunctionExpression': true
      }
    }],
    'jest/no-test-callback': ['off']
  },
  parser: 'babel-eslint',
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect'
    }
  }
}
