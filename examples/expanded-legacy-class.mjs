// Super Class

export function Shape(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

// Static Class Fields, Methods
Object.defineProperties(Shape, {
	metricInch: {
		value: 25.4,
	},
	fromMetric: {
		value: function fromMetric(num) {
			return num * this.metricInch;
		},
	},
	toMetric: {
		value: function toMetric(num) {
			return num / this.metricInch;
		},
	},
});

// Public Methods, Getter
Object.defineProperties(Shape.prototype, {
	move: {
		value: function move(x = 0, y = 0) {
			this.x += x;
			this.y += y;
		},
	},
	standardInch: {
		get() {
			return Shape.metricInch;
		},
	},
});

// Static Shape Properties

// Child Class

export function Rectangle(x = 0, y = 0, width = 0, height = 0) {
	this.standardWidth;
	this.standardHeight;

	Shape.call(this, x, y); // call super constructor.
	this.width = width;
	this.height = height;
}

Object.defineProperties(Rectangle.prototype, {
	area: {
		value: function area() {
			return this.width * this.height;
		},
	},
	height: {
		set(num) {
			this.standardHeight = Shape.toMetric(num);
		},
		get() {
			return Shape.fromMetric(this.standardHeight);
		},
	},
	width: {
		set(num) {
			this.standardWidth = Shape.toMetric(num);
		},
		get() {
			return Shape.fromMetric(this.standardWidth);
		},
	},
});

Object.setPrototypeOf(Rectangle.prototype, Shape.prototype);

// Subclass of Rectangle
// every Square is a Rectangle, but not every Rectangle is a square!
// This case is special, since Square has a private property.
export let Square;

{
	// Create a private scope, seen only within this closure.
	const privateScope = new WeakMap();

	Square = function(x = 0, y = 0, side = 0) {
		Rectangle.call(this, x, y, side, side);
		this.side = side;
	}

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
		side: {
			get() {
				const dimension = privateScope.get(this)['#side'];
				return Shape.fromMetric(dimension);
			},
	
			set(num) {
				privateScope.set(this, { ['#side']: Shape.toMetric(num)})
				this.width = num;
				this.height = num;
			}
		}
	});
}
