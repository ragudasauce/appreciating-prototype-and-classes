import { describe, expect, test } from 'vitest';
import { Shape, Rectangle, Square } from './expanded-es6-class.mjs';

describe('A Shape', () => {
	const metricInch = 25.4;
	describe('the Class should define', () => {
		describe('static properties', () => {
			test('for a metricInch', () => {
				expect(Shape.metricInch).toBe(metricInch);
			});
			test('that convert an assumed inch measurment to standard inches', () => {
				expect(Shape.toMetric(10)).toBe(10 / metricInch);
			});
			test('that convert an metric inch measurment to inches', () => {
				const inches = 22;
				const metricInches = inches / metricInch;
				expect(Shape.fromMetric(metricInches)).toBe(inches);
			});
		});

		test('public properties', () => {
			expect(Object.hasOwn(Shape.prototype, 'move')).toBe(true);
			expect(Object.hasOwn(Shape.prototype, 'standardInch')).toBe(true);
		});
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
		test('should change the x and y properties', () => {
			const shape = new Shape();

			shape.move();
			expect(shape.x).toBe(0);
			expect(shape.y).toBe(0);

			shape.move(3);
			expect(shape.x).toBe(3);
			expect(shape.y).toBe(0);
			
			shape.move(3, 6);
			expect(shape.x).toBe(6);
			expect(shape.y).toBe(6);
		});
		test('should retrieve the standardInch', () => {
			const shape = new Shape();
			expect(shape.standardInch).toBe(metricInch);
		});
	});
});

describe('A Rectangle', () => {
	describe('the class', () => {
		describe('public properties', () => {
			test('should be defined', () => {
				expect(Rectangle.prototype.area).toBeDefined();
				expect(Rectangle.prototype.height).toBeDefined();
				expect(Rectangle.prototype.width).toBeDefined();
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
			expect(rectangle.standardHeight).toBe(height);
			expect(rectangle.standardWidth).toBe(width);
			expect(rectangle.height).toBe(height);
			expect(rectangle.width).toBe(width);

			width = 10;
			height = 20;
			rectangle = new Rectangle(0, 0, width, height);
			expect(rectangle.standardHeight).toBe(height / Shape.metricInch);
			expect(rectangle.standardWidth).toBe(width / Shape.metricInch);
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
		test('should have a side', () => {
			expect(Object.hasOwn(Square.prototype, 'side')).toBe(true);
		});
		test('should be an intance of a Square, Rectangle, and Shape', () => {
			const square = new Square();
			expect(square instanceof Square).toBe(true)
			expect(square instanceof Rectangle).toBe(true)
			expect(square instanceof Shape).toBe(true)
		})
	});

	describe('an instance', () => {
		test('should match a side and a dimension', () => {
			const dimension = 10;
			const square = new Square(0, 0, dimension);
			expect(square.width).toBe(dimension);
			expect(square.height).toBe(dimension);
			expect(square.side).toBe(dimension);
		})
	})
})