import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'json', 'html'],
			all: true,
			include: ['src/**'],
			exclude: ['node_modules', 'tests'],
		},
	},
})
