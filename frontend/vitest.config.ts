import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 4000, // Substitua pela porta desejada
		host: true, // Se você deseja que o servidor seja acessível externamente
	},
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
			exclude: [
				'node_modules',
				'tests',
				'src/tests',
				'**/*.type.ts',
				'**/*.stories.tsx',
				'**/*page.tsx',
				'src/app/exempla.tsx',
			],
		},
		setupFiles: './vitest.setup.mts',
	},
})
