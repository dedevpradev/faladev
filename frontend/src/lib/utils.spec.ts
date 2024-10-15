import { describe, it, expect } from 'vitest'

import { cn } from './utils' // Ajuste o caminho conforme necessário

describe('cn', () => {
	it('should combine class names and remove duplicates', () => {
		expect(cn('bg-blue-500', 'text-white', 'bg-blue-500')).toBe('text-white bg-blue-500')
	})

	it('should handle empty input', () => {
		expect(cn()).toBe('')
		expect(cn('')).toBe('')
	})

	it('should handle multiple inputs', () => {
		expect(cn('bg-blue-500', 'text-white', ['p-4', 'm-2'])).toBe('bg-blue-500 text-white p-4 m-2')
	})
})
