import { comboObject } from './combo-object.mjs';
import { describe, expect, test, beforeEach } from 'vitest';

describe('An object created from two other objects', () => {
	test('should have an "a", "b", and "c" property', () => {
		expect(Object.hasOwn(comboObject, 'a')).toBe(true);
		expect(Object.hasOwn(comboObject, 'b')).toBe(true);
		expect(Object.hasOwn(comboObject, 'c')).toBe(true);
		expect(comboObject.a).toBe(1);
		expect(comboObject.b).toBe(5);
		expect(comboObject.c).toBe(3);
	});
});
