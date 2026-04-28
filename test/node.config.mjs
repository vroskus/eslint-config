import eslintConfig from '../src/index.ts';

export default eslintConfig.node({
  rules: {
    'import/extensions': [
      0,
    ],
    'no-magic-numbers': [
      0,
    ],
  },
});
