import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },

  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/libs-origin/*'],
              message: "Don't import from @/libs-origin. Use @/libs instead.",
            },
          ],
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
      'src/libs/_assembly/*',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
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
];

export default eslintConfig;
