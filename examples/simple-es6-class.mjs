// Super Class
export class Shape {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

// Child Class
export class Rectangle extends Shape {
	constructor(x = 0, y = 0, width = 0, height = 0) {
		super(x, y);
		this.width = width;
		this.height = height;
	}

	area() {
		return this.width * this.height;
	}
}

// Extended
// every Square is a Rectangle, but not every Rectangle is a square!
export class Square extends Rectangle {
	constructor(x = 0, y = 0, side = 0) {
		super(x, y, side, side);
	}
}
