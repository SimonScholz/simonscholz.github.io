module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		jsx: false,
	},
	extends: [
		'react-app',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:sonarjs/recommended',
	],

	settings: {
		linkComponents: { name: 'Link', linkAttribute: 'to' },
	},

	rules: {
		'no-throw-literal': 'off',
		'@typescript-eslint/no-angle-bracket-type-assertion': 'off',
		'@typescript-eslint/interface-name-prefix': ['warn', 'always'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],
		'no-shadow': 'warn',
		'import/no-useless-path-segments': 'warn',
		'import/no-unresolved': 'error',
		'jsx-a11y/alt-text': [
			'warn',
			{
				img: ['Img'],
			},
		],
		'jsx-a11y/anchor-has-content': [
			'warn',
			{
				components: ['Link'],
			},
		],
		'jsx-a11y/anchor-is-valid': [
			'warn',
			{
				components: ['Link', 'ExternalLink'],
				specialLink: ['to'],
				aspects: ['noHref', 'invalidHref'],
			},
		],
		'jsx-a11y/img-redundant-alt': [
			'warn',
			{
				components: ['Img'],
			},
		],
		'jsx-a11y/lang': 'error',
	},
}
