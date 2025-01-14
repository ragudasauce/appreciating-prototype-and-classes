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
			enabled: true,
			exclude: ['./examples/main.js', ...coverageConfigDefaults.exclude],
			thresholds: 100,
			reporter: ['text', 'json', 'html'],
		},
	},
});
