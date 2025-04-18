module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-recommended-vue',
		'stylelint-config-recess-order'
	],
	overrides: [
		{
			files: ['**/*.{vue,html}'],
			customSyntax: 'postcss-html'
		}
	],
	// 规则
	rules: {
		'no-empty-source': null
	}
};
