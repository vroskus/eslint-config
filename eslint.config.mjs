import eslint from '@eslint/js';
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts';
import problems from 'eslint-config-problems';
import importPlugin from 'eslint-plugin-import';
import importNewlinesPlugin from 'eslint-plugin-import-newlines';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

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
      stylisticTsPlugin,
    },
  }
);
