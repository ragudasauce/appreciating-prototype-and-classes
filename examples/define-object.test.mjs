import { basicObject } from './define-object.mjs';
import { describe, expect, test, beforeEach } from 'vitest';

describe('A basic object', () => {
	test('should have an "a" and "b" property', () => {
		expect(Object.hasOwn(basicObject, 'a')).toBe(true);
		expect(Object.hasOwn(basicObject, 'b')).toBe(true);
		expect(basicObject.a).toBe(1);
		expect(basicObject.b).toBe(2);
	});
});
