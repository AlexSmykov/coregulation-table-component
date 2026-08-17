const eslint = require('@eslint/js');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  { ignores: [] },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          destructuredArrayIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['error'] }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateAccessibility, ...angular.configs.templateRecommended],
    rules: {},
  },
);
