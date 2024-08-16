# @vroskus/eslint-config

Eslint config to make code proper

## Installation

Call:

`npm install -D @vroskus/eslint-config`

`yarn add -D @vroskus/eslint-config`

## Usage

```
import eslintConfig from '@vroskus/eslint-config';

/* eslintConfig.browser() for dom, eslintConfig.node() for node */
const config = eslintConfig.<browser | node>({
  configs: /* array of additional configs */
  rules: /* object of additional rules */ 
});

export default [
  ...config,
  {
    /*... */
  },
  // ...
];

```
