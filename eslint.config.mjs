import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const commonRestrictedImportPatterns = [
  {
    group: ['@/libs/assembly*'],
    message: "Don't import from assembly file. Use @/libs/{NAME} instead.",
  },
  {
    group: ['@generated/*'],
    message: "Don't import from @/generated. Use @/libs/{NAME} instead.",
  },
];

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...commonRestrictedImportPatterns,
            {
              group: ['@/libs-origin/*'],
              message: "Don't import from @/libs-origin. Use @/libs instead.",
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            ['sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'never',
        },
      ],
    },
  },
  {
    files: ['src/libs/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...commonRestrictedImportPatterns,
            {
              group: ['@/libs-origin/*'],
              message: "Don't import from @/libs-origin. Use @/libs instead.",
            },
            {
              group: ['@/libs/*'],
              message:
                'Libs cross-imports are not allowed. Instead, use _assembly to do initialization with dependencies.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'src/libs/_assembly/**',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...commonRestrictedImportPatterns,
            {
              group: ['@/libs/*'],
              message:
                'Use @/libs-origin/* inside assembly to avoid referring to itself.',
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
