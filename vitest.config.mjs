import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
	test: {
		// browser: {
		// 	enabled: true,
		// 	name: 'chrome',
		// 	provider: 'preview',
		// },
		coverage: {
			provider: 'istanbul',
			include: './examples/*.test.mjs',
		},
	},
});
