import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import problems from 'eslint-config-problems';
import perfectionist from 'eslint-plugin-perfectionist';
import importPlugin from 'eslint-plugin-import';
import importNewlinesPlugin from 'eslint-plugin-import-newlines';
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: problems.rules,
  },
  perfectionist.configs['recommended-natural'],
  {
    plugins: {
      'import-newlines': importNewlinesPlugin,
      importPlugin,
      reactPlugin,
    },
  }
);
