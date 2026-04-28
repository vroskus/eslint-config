import eslintConfig from './src/index.ts';

export default eslintConfig.node({
  rules: {
    complexity: [
      'error',
      9,
    ],
    'no-magic-numbers': [
      0,
    ],
  },
});
