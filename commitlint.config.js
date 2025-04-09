export default {
	extends: ['@commitlint/config-conventional'],
	// prompt: {
	// 	alias: { fd: 'docs: fix typos' },
	// 	messages: {
	// 		type: '选择你要提交的类型 :',
	// 		scope: '选择一个提交范围（可选）:',
	// 		customScope: '请输入自定义的提交范围 :',
	// 		subject: '填写简短精炼的变更描述 :\n',
	// 		body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
	// 		breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
	// 		footerPrefixesSelect: '选择关联issue前缀（可选）:',
	// 		customFooterPrefix: '输入自定义issue前缀 :',
	// 		footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
	// 		confirmCommit: '是否提交或修改commit ?'
	// 	},
	// 	types: [
	// 		{ value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
	// 		{ value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: ':bug:' },
	// 		{
	// 			value: 'docs',
	// 			name: 'docs:     📝  文档更新 | Documentation only changes',
	// 			emoji: ':memo:'
	// 		},
	// 		{
	// 			value: 'style',
	// 			name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code',
	// 			emoji: ':lipstick:'
	// 		},
	// 		{
	// 			value: 'refactor',
	// 			name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
	// 			emoji: ':recycle:'
	// 		},
	// 		{
	// 			value: 'perf',
	// 			name: 'perf:     ⚡️  性能提升 | A code change that improves performance',
	// 			emoji: ':zap:'
	// 		},
	// 		{
	// 			value: 'test',
	// 			name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests',
	// 			emoji: ':white_check_mark:'
	// 		},
	// 		{
	// 			value: 'build',
	// 			name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies',
	// 			emoji: ':package:'
	// 		},
	// 		{
	// 			value: 'ci',
	// 			name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts',
	// 			emoji: ':ferris_wheel:'
	// 		},
	// 		{
	// 			value: 'chore',
	// 			name: "chore:    🔨  其他修改 | Other changes that don't modify src or test files",
	// 			emoji: ':hammer:'
	// 		},
	// 		{
	// 			value: 'revert',
	// 			name: 'revert:   ⏪️  回退代码 | Reverts a previous commit',
	// 			emoji: ':rewind:'
	// 		}
	// 	],
	// 	useEmoji: false,
	// 	emojiAlign: 'center',
	// 	useAI: false,
	// 	aiNumber: 1,
	// 	themeColorCode: '',
	// 	scopes: [],
	// 	allowCustomScopes: true,
	// 	allowEmptyScopes: true,
	// 	customScopesAlign: 'bottom',
	// 	customScopesAlias: 'custom',
	// 	emptyScopesAlias: 'empty',
	// 	upperCaseSubject: false,
	// 	markBreakingChangeMode: false,
	// 	allowBreakingChanges: ['feat', 'fix'],
	// 	breaklineNumber: 100,
	// 	breaklineChar: '|',
	// 	// scope' | 'body' | 'breaking' | 'footerPrefix' | 'footer' | 'confirmCommit'
	// 	skipQuestions: ['scope', 'body', 'breaking', 'footerPrefix', 'footer', 'confirmCommit'],
	// 	issuePrefixes: [
	// 		// 如果使用 gitee 作为开发管理
	// 		{ value: 'link', name: 'link:     链接 ISSUES 进行中' },
	// 		{ value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
	// 	],
	// 	// 跳过选择关联issue前缀
	// 	customIssuePrefixAlign: 'top',
	// 	emptyIssuePrefixAlias: 'skip',
	// 	customIssuePrefixAlias: 'custom',
	// 	allowCustomIssuePrefix: true,
	// 	allowEmptyIssuePrefix: true,
	// 	confirmColorize: true,
	// 	scopeOverrides: undefined,
	// 	defaultBody: '',
	// 	defaultIssues: '',
	// 	defaultScope: '',
	// 	defaultSubject: ''
	// }
	prompt: {
		settings: {},
		messages: {
			skip: ':skip',
			max: 'upper %d chars',
			min: '%d chars at least',
			emptyWarning: 'can not be empty',
			upperLimitWarning: 'over limit',
			lowerLimitWarning: 'below limit'
		},
		questions: {
			type: {
				description: "Select the type of change that you're committing:",
				enum: {
					feat: {
						description: 'A new feature',
						title: 'Features',
						emoji: '✨',
					},
					fix: {
						description: 'A bug fix',
						title: 'Bug Fixes',
						emoji: '🐛',
					},
					docs: {
						description: 'Documentation only changes',
						title: 'Documentation',
						emoji: '📚',
					},
					style: {
						description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
						title: 'Styles',
						emoji: '💎',
					},
					refactor: {
						description: 'A code change that neither fixes a bug nor adds a feature',
						title: 'Code Refactoring',
						emoji: '📦',
					},
					perf: {
						description: 'A code change that improves performance',
						title: 'Performance Improvements',
						emoji: '🚀',
					},
					test: {
						description: 'Adding missing tests or correcting existing tests',
						title: 'Tests',
						emoji: '🚨',
					},
					build: {
						description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
						title: 'Builds',
						emoji: '🛠',
					},
					ci: {
						description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
						title: 'Continuous Integrations',
						emoji: '⚙️',
					},
					chore: {
						description: "Other changes that don't modify src or test files",
						title: 'Chores',
						emoji: '♻️',
					},
					revert: {
						description: 'Reverts a previous commit',
						title: 'Reverts',
						emoji: '🗑',
					},
				},
			},
			scope: {
				description:
					'What is the scope of this change (e.g. component or file name)',
			},
			subject: {
				description: 'Write a short, imperative tense description of the change',
			},
			body: {
				description: 'Provide a longer description of the change',
			},
			isBreaking: {
				description: 'Are there any breaking changes?',
			},
			breakingBody: {
				description:
					'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
			},
			breaking: {
				description: 'Describe the breaking changes',
			},
			isIssueAffected: {
				description: 'Does this change affect any open issues?',
			},
			issuesBody: {
				description:
					'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
			},
			issues: {
				description: 'Add issue references (e.g. "fix #123", "re #123".)',
			},
		},
	}
};
