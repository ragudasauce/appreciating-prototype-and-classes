// Super Class

export function Shape(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

// Child Class

export function Rectangle(x = 0, y = 0, width = 0, height = 0) {
	Shape.call(this, x, y); // call super constructor.
	this.width = width;
	this.height = height;
}

Rectangle.prototype.area = function area() {
	return this.width * this.height;
};

// Extend the Super Class

Object.setPrototypeOf(Rectangle.prototype, Shape.prototype);

// Subclass of Rectangle
// every Square is a Rectangle, but not every Rectangle is a square!

export function Square(x = 0, y = 0, side = 0) {
	Rectangle.call(this, x, y, side, side);
}

// This was the way to set the prototype before
// Object.setPrototypeOf existed in the engine

Square.prototype = Object.create(Rectangle.prototype, {
	// If you don't set Square.prototype.constructor to Square,
	// it will take the prototype.constructor of Rectangle (parent).
	// To avoid that, we set the prototype.constructor to Square (child).
	constructor: {
		value: Square,
		enumerable: false,
		writable: true,
		configurable: true,
	},
});
