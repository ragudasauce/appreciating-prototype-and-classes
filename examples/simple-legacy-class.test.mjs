import { describe, expect, test } from 'vitest';
import { Shape, Rectangle, Square } from './simple-legacy-class.mjs';

describe('A Shape', () => {
    test('Class should not have public properties', () => {
        expect(Object.keys(Shape).length).toBe(0);
    });

	describe('Instance', () => {
		test('should be an instance of the Shape class', () => {
			const shape = new Shape();
			expect(shape instanceof Shape).toBe(true);
		});
		test('should have a default x and y', () => {
			const shape = new Shape();
			expect(shape.x).toBe(0);
			expect(shape.y).toBe(0);
		});
		test('should configure an x and y', () => {
			const x = 2;
			const y = 4;
			const shape = new Shape(x, y);
			expect(shape.x).toBe(x);
			expect(shape.y).toBe(y);
		});
	});
});

describe('A Rectangle', () => {
	describe('the class', () => {
		describe('public properties', () => {
			test('should be defined', () => {
				expect(Rectangle.prototype.area).toBeDefined();
			});
		});
	});

	describe('an instance', () => {
		test('should be an instance of the Rectangle and Shape classes', () => {
			const rect = new Rectangle();
			expect(rect instanceof Rectangle).toBe(true);
			expect(rect instanceof Shape).toBe(true);
		});
		test('should configure position and size', () => {
			let width = 0;
			let height = 0;
			let rectangle = new Rectangle();
			expect(rectangle.height).toBe(height);
			expect(rectangle.width).toBe(width);

			width = 10;
			height = 20;
			rectangle = new Rectangle(0, 0, width, height);
			expect(rectangle.height).toBe(height);
			expect(rectangle.width).toBe(width);
		});
		test('should calculate the area', () => {
			const rect1 = new Rectangle();
			const rect2 = new Rectangle(2, 4, 10, 20);

			expect(rect1.area()).toBe(0);
			expect(rect2.area()).toBe(200);
		});
	});
});

describe('a Square', () => {
	describe('the class', () => {
		test('should have no public properties', () => {
			expect(Object.keys(Square).length).toBe(0);
		});
		test('should be an intance of a Square, Rectangle, and Shape', () => {
			const square = new Square();
			expect(square instanceof Square).toBe(true)
			expect(square instanceof Rectangle).toBe(true)
			expect(square instanceof Shape).toBe(true)
		})
	});

	describe('an instance', () => {
		test('should have a width and a height', () => {
			const dimension = 10;
			const square = new Square(0, 0, dimension);
			expect(square.width).toBe(dimension);
			expect(square.height).toBe(dimension);
		})
	})
})
