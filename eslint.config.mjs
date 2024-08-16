import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import problems from 'eslint-config-problems';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: problems.rules,
  },
  perfectionist.configs['recommended-natural'],
);
