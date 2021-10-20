module.exports = {
	env: {
		browser: false,
		es6: true,
		commonjs: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings'
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		/*
		 * Common rules that you may want to change
		 */
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'linebreak-style': ['error', 'unix'],
		'max-len': ['warn', {
			'code': 120,
			'ignoreUrls': true,
			'ignoreRegExpLiterals': true,
			'ignoreTemplateLiterals': true,
		}],

		/*
		 * KG Recommended rules. Only change if you really need to
		 */
		'semi': ['error', 'always'],
		'eqeqeq': ['error', 'always'],
		'block-scoped-var': 'warn',
		'default-param-last': 'warn',
		'no-constructor-return': 'warn',
		'no-eval': 'warn',
		'no-extra-bind': 'warn',
		'no-labels': 'warn',
		'no-param-reassign': 'warn',
		'no-sequences': 'warn',
		'no-shadow': ['warn', {
			'hoist': 'functions'
		}],
		'no-implicit-globals': ['warn', {
			'lexicalBindings': true
		}],

		/*
		 * KG Stylistic rules. Change if they conflict with an existing codebase, remove completely if using Prettier.
		 */
		'brace-style': ['warn', '1tbs', {
			'allowSingleLine': true
		}],
		'curly': ['warn', 'multi-line'],
		'no-multi-spaces': ['warn', {
			'ignoreEOLComments': true
		}],
		'comma-dangle': ['warn', 'only-multiline'],
		'func-call-spacing': 'warn',
		'key-spacing': 'warn',
		'keyword-spacing': 'warn',
		'lines-between-class-members': 'warn',
		'no-lonely-if': 'warn',
		'no-trailing-spaces': 'warn'
	}
};