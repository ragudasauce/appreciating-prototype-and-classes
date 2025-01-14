import { shape, rectangle, square } from './inheritable-objects.mjs';
import { describe, expect, test } from 'vitest';

describe('the parent object', () => {
	test('it should have an x property', () => {
		expect(Object.hasOwn(shape, 'x')).toBe(true);
	});
	test('it should have a y property', () => {
		expect(Object.hasOwn(shape, 'y')).toBe(true);
	});
	test('it should have an area function', () => {
		expect(Object.hasOwn(shape, 'area')).toBe(true);
	});
	test('the area function should fail because width and height are not defined', () => {
		expect(shape.area()).toBeNaN();
	});
});

describe('the child objects', () => {
	test('they should have thier prototype linked to the parent', () => {});

	test('should have the parent shape object as its prototype', () => {
		expect(Object.getPrototypeOf(rectangle) === shape);
		expect(Object.getPrototypeOf(square) === shape);
	});

	test('will not be an instance, since the parent is not a constructor function', () => {
		// Different browsers throw different error strings.
		expect(() => rectangle instanceof templateObject).toThrow();
		expect(() => shape instanceof templateObject).toThrow();
	});
});
