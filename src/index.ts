// Global Types
import type {
  ESLint,
  Linter,
} from 'eslint';

// Helpers
import {
  fixupConfigRules,
} from '@eslint/compat';
import {
  FlatCompat,
} from '@eslint/eslintrc';
import eslint from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import bindingsNewlinePlugin from 'eslint-plugin-module-bindings-newline';
import perfectionist from 'eslint-plugin-perfectionist';
import problems from 'eslint-config-problems';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import path from 'node:path';
import {
  fileURLToPath,
} from 'node:url';
import typescriptEslint from 'typescript-eslint';

// Types
type $ConfigParams = {
  configs?: Array<{
    [arg0: string]: unknown;
    rules: Linter.RulesRecord;
  }>;
  languageOptions?: Linter.LanguageOptions;
  plugins?: Record<string, ESLint.Plugin>;
  rules?: Linter.RulesRecord;
};

// Rule state
const off = 0;
const warning = 1;
const error = 2;

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
    baseSubpath = '/base';
  }

  const airbnbBaseConfig = compat.extends(`airbnb${baseSubpath}`);
  const airbnbTypescriptConfig = compat.extends(`airbnb-typescript${baseSubpath}`);

  // @ts-expect-error plugins has to be reset
  airbnbTypescriptConfig[0].plugins = [
  ];

  const currentAirbnbRules = airbnbTypescriptConfig[0].rules;
  const airbnbTypescriptConfigRules = {
  };

  if (currentAirbnbRules) {
    Object.keys(currentAirbnbRules).forEach((key) => {
      if (key.includes('@typescript-eslint/') === false) {
        const value = currentAirbnbRules[key];
        const tsValue = currentAirbnbRules[`@typescript-eslint/${key}`];

        airbnbTypescriptConfigRules[key] = tsValue || value;
      }
    });
  }

  airbnbTypescriptConfigRules['comma-dangle'] = [
    'error',
    'always-multiline',
  ];

  airbnbTypescriptConfig[0].rules = airbnbTypescriptConfigRules;

  return [
    ...fixupConfigRules(airbnbBaseConfig),
    ...fixupConfigRules(airbnbTypescriptConfig),
  ];
};

const commonExtends = [
  eslint.configs.recommended,
  {
    rules: problems.rules,
  },
  perfectionist.configs['recommended-natural'],
  sonarjs.configs?.recommended,
  promise.configs['flat/recommended'],
];

const commonPlugins: Record<string, ESLint.Plugin> = {
  '@stylistic': stylisticPlugin,
  'module-bindings-newline': bindingsNewlinePlugin as ESLint.Plugin,
};

const commonLanguageOptions: Linter.LanguageOptions = {
  ecmaVersion: 'latest',
  parserOptions: {
    tsconfigRootDir: import.meta.dirname,
  },
  sourceType: 'commonjs',
};

const commonRules: Linter.RulesRecord = {
  '@stylistic/array-bracket-newline': [
    'error',
    'always',
  ],
  '@stylistic/array-element-newline': [
    'error',
    'always',
  ],
  '@stylistic/curly-newline': [
    'error',
    'always',
  ],
  '@stylistic/function-call-argument-newline': [
    'error',
    'always',
  ],
  '@stylistic/function-call-spacing': [
    'error',
    'never',
  ],
  '@stylistic/jsx-newline': [
    'error',
    {
      prevent: false,
    },
  ],
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      multilineDetection: 'brackets',
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    },
  ],
  '@typescript-eslint/ban-ts-comment': [
    warning,
  ],
  camelcase: [
    'error',
  ],
  complexity: [
    'error',
    4,
  ],
  curly: [
    'error',
    'all',
  ],
  'function-call-argument-newline': [
    'error',
    'always',
  ],
  'import/no-cycle': [
    off,
  ],
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/eslint.config.*',
        'test/**',
      ],
    },
  ],
  'module-bindings-newline/export': [
    'error',
  ],
  'module-bindings-newline/import': [
    'error',
  ],
  'no-await-in-loop': off,
  'no-console': [
    'error',
    {
      allow: [
        'error',
        'info',
      ],
    },
  ],
  'no-duplicate-imports': [
    off,
  ],
  'no-loss-of-precision': [
    off,
  ],
  'no-magic-numbers': [
    error,
  ],
  'no-unreachable-loop': [
    off,
  ],
  'no-unused-private-class-members': [
    error,
  ],
  'no-useless-backreference': [
    off,
  ],
  'object-curly-newline': [
    'error',
    {
      ExportDeclaration: 'always',
      ImportDeclaration: 'always',
      ObjectExpression: 'always',
      ObjectPattern: 'always',
    },
  ],
  'object-property-newline': [
    'error',
    {
      allowMultiplePropertiesPerLine: false,
    },
  ],
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      next: '*',
      prev: [
        'const',
        'let',
      ],
    },
    {
      blankLine: 'any',
      next: [
        'const',
        'let',
      ],
      prev: [
        'const',
        'let',
      ],
    },
    {
      blankLine: 'always',
      next: '*',
      prev: [
        'if',
        'function',
        'for',
      ],
    },
    {
      blankLine: 'always',
      next: 'return',
      prev: '*',
    },
  ],
  'perfectionist/sort-classes': [
    off,
  ],
  'perfectionist/sort-exports': [
    off,
  ],
  'perfectionist/sort-imports': [
    off,
  ],
  'perfectionist/sort-modules': [
    off,
  ], // A very good rule but breaks no-use-before-define
  'promise/always-return': [
    off,
  ],
  'sonarjs/no-built-in-override': [
    error,
  ],
  'sonarjs/no-collapsible-if': [
    error,
  ],
  'sonarjs/no-duplicate-string': [
    'error',
    {
      threshold: 5,
    },
  ],
  'sonarjs/no-small-switch': [
    off,
  ],
  'sonarjs/no-unused-vars': [
    off,
  ], // Some strange misbehavior on 'export const'
  'sonarjs/prefer-object-literal': [
    error,
  ],
  'sonarjs/prefer-single-boolean-return': [
    off,
  ],
  'sonarjs/redundant-type-aliases': [
    off,
  ], // Removes types that are explanatory purpose
};

const nodeConfig = (params: $ConfigParams | void) => typescriptEslint.config({
  extends: [
    ...commonExtends,
    ...getAirbnbConfigs(true),
    ...typescriptEslint.configs.recommended,
    ...(params?.configs || [
    ]),
  ],
  languageOptions: {
    ...commonLanguageOptions,
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    ...(params?.languageOptions || {
    }),
  },
  plugins: {
    ...commonPlugins,
    ...(params?.plugins || {
    }),
  },
  rules: {
    ...commonRules,
    'no-restricted-syntax': off,
    strict: [
      off,
    ],
    ...(params?.rules || {
    }),
  },
});

const browserConfig = (params: $ConfigParams | void) => typescriptEslint.config({
  extends: [
    ...commonExtends,
    ...getAirbnbConfigs(),
    ...typescriptEslint.configs.recommended,
    ...(params?.configs || [
    ]),
  ],
  languageOptions: {
    ...commonLanguageOptions,
    globals: {
      ...globals.browser,
      ...globals.jest,
    },
    ...(params?.languageOptions || {
    }),
  },
  plugins: {
    ...commonPlugins,
    ...(params?.plugins || {
    }),
  },
  rules: {
    ...commonRules,
    'func-names': [
      off,
    ],
    'jsx-a11y/control-has-associated-label': [
      warning,
    ],
    'jsx-a11y/href-no-hash': [
      off,
    ],
    'jsx-a11y/label-has-associated-control': [
      warning,
    ],
    'react/boolean-prop-naming': [
      warning,
    ],
    'react/display-name': [
      error,
      'always',
    ],
    'react/jsx-curly-brace-presence': [
      error,
      'always',
    ],
    'react/jsx-max-props-per-line': [
      warning,
      {
        maximum: 1,
      },
    ],
    'react/jsx-sort-props': [
      off,
    ],
    'react/no-multi-comp': [
      error,
      'always',
    ],
    'react/prop-types': [
      off,
    ],
    'react/require-default-props': [
      error,
      {
        forbidDefaultForRequired: false,
      },
    ],
    'react/static-property-placement': [
      error,
      'property assignment',
      {
        contextType: 'static public field',
        contextTypes: 'static public field',
        defaultProps: 'static public field',
        displayName: 'static public field',
      },
    ],
    ...(params?.rules || {
    }),
  },
});

export default {
  browser: browserConfig,
  node: nodeConfig,
};
