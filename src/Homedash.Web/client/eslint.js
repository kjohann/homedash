module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint-config-airbnb', 'eslint-config-jest-enzyme'].map(require.resolve),
  rules: {
    'object-curly-newline': 0,
    'comma-dangle': [2, 'never'],
    'arrow-body-style': 0,
    'no-case-declarations': 0,
    'quote-props': [2, 'consistent-as-needed'],
    'max-len': 0,
    'no-global-assign': 0,
    'linebreak-style': 0,
    'no-unsafe-negation': 0,
    'no-underscore-dangle': 0,
    'import/imports-first': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/prop-types': [1],
    'react/require-extension': 0,
    'react/jsx-curly-spacing': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/self-closing-comp': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/no-typos': 0, // https://github.com/yannickcr/eslint-plugin-react/issues/1389
    'react/no-array-index-key': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: [] // Link fra react-router tar inn to, ikke href.
    }],
    'jsx-a11y/aria-role': 0,
    'jsx-a11y/img-redundant-alt': 0,
    'jsx-a11y/img-has-alt': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 0
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  globals: {
    expect: true,
    __DEV__: true,
    it: true,
    jest: true,
    describe: true,
    beforeAll: true,
    beforeEach: true,
    afterEach: true,
    sinon: true,
    window: true,
    document: true,
    sessionStorage: true,
    URLSearchParams: true,
    MutationObserver: true,
    SVGElement: true,
    fetch: true
  }
};
