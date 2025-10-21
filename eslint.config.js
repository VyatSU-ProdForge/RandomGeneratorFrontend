import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // ❌ Запрещены type assertions (as)
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'never'
      }],
      
      // ✅ Обязательны explicit return types для функций
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: false,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      }],
      
      // ✅ Обязательны типы для всех параметров
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      
      // ❌ Запрещен typeof operator (в случаях где можно использовать другие способы)
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      
      // ❌ Запрещены глобальные переменные
      'no-restricted-globals': ['error', 'event', 'name', 'status'],
      
      // ✅ Интерфейсы обязательно начинаются с I
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
      ],
      
      // Дополнительные строгие правила
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      
      // React правила
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    }
  },
])
