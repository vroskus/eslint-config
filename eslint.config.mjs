import eslintConfig from './src/index.ts';

export default eslintConfig.node({
  rules: {
    'no-magic-numbers': [0],
    complexity: ['error', 9],
  },
});
