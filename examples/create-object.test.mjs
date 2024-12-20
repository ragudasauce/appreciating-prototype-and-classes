import { templateObject } from './create-object.mjs';
import { describe, expect, test, beforeEach } from 'vitest';

describe('A template object', () => {
	test('should have an isHuman property', () => {
		expect(Object.hasOwn(templateObject, 'isHuman')).toBe(true);
		expect(templateObject.isHuman).toBe(false);
	});

	test('should have an intro method', () => {
		expect(Object.hasOwn(templateObject, 'intro')).toBe(true);
		expect(typeof templateObject.intro).toBe('function');
	});

	test('should not have a name property', () => {
		expect(Object.hasOwn(templateObject, 'name')).toBe(false);
	});

	test('the intro function should return a default string', () => {
		const introStr = templateObject.intro();
		expect(templateObject.intro()).toBe('My name is undefined. Am I human? false');
	});
});

describe('an object created from the template object', () => {
	let me, name, isHuman;
	beforeEach(() => {
		name = 'Mark';
		isHuman = true;
		me = Object.create(templateObject);
		me.name = name;
		me.isHuman = isHuman;
	});

	test('should have the template object as its prototype', () => {
		expect(Object.getPrototypeOf(me) === templateObject);
	});

	test('will not be an instance, since the parent is not a constructor function', () => {
		expect(() => me instanceof templateObject).toThrow("Right-hand side of 'instanceof' is not callable");
	});

	describe('the isHuman property', () => {
		test('should be present with different values in the chain', () => {
			expect(me.isHuman).toBe(true);
			expect(me.__proto__.isHuman).toBe(false);
		});
	});

	describe('the name property', () => {
		test('should only be present on the child', () => {
			expect(me.name).toBeDefined();
			expect(me.__proto__.name).not.toBeDefined();
		});

		test('should appear correctly in the intro string', () => {
			const introString = me.intro();
			expect(introString).toBe(`My name is ${name}. Am I human? ${isHuman}`);
		});
	});
});
