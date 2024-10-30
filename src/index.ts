// Types
import type {
  Linter,
} from "eslint";

import {
  fixupConfigRules,
} from '@eslint/compat';
import {
  FlatCompat,
} from '@eslint/eslintrc';
import eslint from '@eslint/js';
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts';
import problems from 'eslint-config-problems';
import importNewlinesPlugin from 'eslint-plugin-import-newlines';
import perfectionist from 'eslint-plugin-perfectionist';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import path from 'node:path';
import {
  fileURLToPath,
} from 'node:url';
import typescriptEslint from 'typescript-eslint';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  allConfig: eslint.configs.all,
  baseDirectory: dirname,
  recommendedConfig: eslint.configs.recommended,
});

const getAirbnbConfigs = (base?: boolean) => {
  let baseSubpath = '';

  if (base === true) {
    baseSubpath = '/base'
  }

  const airbnbBaseConfig = compat.extends(`airbnb${baseSubpath}`);
  const airbnbTypescriptConfig = compat.extends(`airbnb-typescript${baseSubpath}`);
  
  airbnbTypescriptConfig[0].plugins = [];
  
  const currentAirbnbRules = airbnbTypescriptConfig[0].rules;
  const airbnbTypescriptConfigRules = {
  };
  
  Object.keys(currentAirbnbRules).forEach((key) => {
    if (key.includes('@typescript-eslint/') === false) {
      const value = currentAirbnbRules[key];
      const tsValue = currentAirbnbRules[`@typescript-eslint/${key}`];
  
      airbnbTypescriptConfigRules[key] = tsValue || value;
    }
  });
  
  airbnbTypescriptConfigRules['comma-dangle'] = ['error', 'always-multiline'];
  
  airbnbTypescriptConfig[0].rules = airbnbTypescriptConfigRules;

  return [
    ...fixupConfigRules(airbnbBaseConfig),
    ...fixupConfigRules(airbnbTypescriptConfig),
  ];
}

const commonPlugins = {
  '@stylistic/ts': stylisticTsPlugin,
  'import-newlines': importNewlinesPlugin,
};

const commonRules: Linter.RulesRecord = {
  '@stylistic/ts/member-delimiter-style': ['error', {
    'multiline': {
      'delimiter': 'semi',
      'requireLast': true
    },
    'multilineDetection': 'brackets',
    'singleline': {
      'delimiter': 'semi',
      'requireLast': false
    },
  }],
  '@typescript-eslint/ban-ts-comment': [1],
  complexity: ['error', 4],
  curly: ['error', 'all'],
  'function-call-argument-newline': ['error', 'always'],
  'import/no-cycle': [0],
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: [
      '**/eslint.config.*',
      'test/**',
    ],
  }],
  'no-await-in-loop': 0,
  'no-console': 'error',
  'no-duplicate-imports': [0],
  'no-loss-of-precision': [0],
  'no-unreachable-loop': [0],
  'no-unused-private-class-members': [2],
  'no-useless-backreference': [0],
  'object-curly-newline': ['error', {
    ExportDeclaration: 'always',
    ImportDeclaration: 'always',
    ObjectExpression: 'always',
    ObjectPattern: 'always',
  }],
  'object-property-newline': ['error', {
    allowMultiplePropertiesPerLine: false,
  }],
  'padding-line-between-statements': ['error', {
    blankLine: 'always',
    next: '*',
    prev: ['const', 'let'],
  }, {
    blankLine: 'any',
    next: ['const', 'let'],
    prev: ['const', 'let'],
  }, {
    blankLine: 'always',
    next: '*',
    prev: ['if', 'function', 'for'],
  }, {
    blankLine: 'always',
    next: 'return',
    prev: '*',
  }],
  'perfectionist/sort-classes': [0],
  'perfectionist/sort-exports': [0],
  'perfectionist/sort-imports': [0],
  'sonarjs/no-duplicate-string': ['error', {
    threshold: 5,
  }],
  'sonarjs/no-small-switch': [0],
  'sonarjs/prefer-single-boolean-return': [0],
};

const nodeConfig = (params: {
  configs?: Array<{
    [arg0: string]: unknown,
    rules: Linter.RulesRecord,
  }>;
  rules?: Linter.RulesRecord;
} | void) => typescriptEslint.config({
  extends: [
    eslint.configs.recommended,
    ...getAirbnbConfigs(true),
    {
      rules: problems.rules,
    },
    perfectionist.configs['recommended-natural'],
    sonarjs.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...(params?.configs || []),
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    sourceType: 'commonjs',
  },
  plugins: commonPlugins,
  rules: {
    ...commonRules,
    'import-newlines/enforce': ['error', {
      forceSingleLine: false,
      items: 1,
    }],
    'no-restricted-syntax': 0,
    strict: [0],
    ...(params?.rules || {}),
  },
});

const browserConfig = (params: {
  configs?: Array<{
    [arg0: string]: unknown,
    rules: Linter.RulesRecord,
  }>;
  rules?: Linter.RulesRecord;
} | void) => typescriptEslint.config({
  extends: [
    eslint.configs.recommended,
    ...getAirbnbConfigs(),
    {
      rules: problems.rules,
    },
    perfectionist.configs['recommended-natural'],
    promise.configs['flat/recommended'],
    sonarjs.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...(params?.configs || []),
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals.browser,
      ...globals.jest,
    },
    sourceType: 'commonjs',
  },
  plugins: commonPlugins,
  rules: {
    ...commonRules,
    'func-names': [0],
    'import-newlines/enforce': ['error', {
      forceSingleLine: false,
      items: 1,
    }],
    'jsx-a11y/control-has-associated-label': [1],
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/label-has-associated-control': [1],
    'promise/always-return': [0],
    'react/jsx-curly-brace-presence': [2, 'always'],
    'react/jsx-max-props-per-line': [1, {
      maximum: 1,
    }],
    'react/jsx-sort-props': [0],
    'react/prop-types': [0],
    'react/require-default-props': [2, {
      forbidDefaultForRequired: false,
    }],
    'react/static-property-placement': [2, 'property assignment', {
      contextType: 'static public field',
      contextTypes: 'static public field',
      defaultProps: 'static public field',
      displayName: 'static public field',
    }],
    ...(params?.rules || {}),
  },
});

export default {
  browser: browserConfig,
  node: nodeConfig,
};
