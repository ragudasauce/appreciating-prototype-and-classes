// Parent object
export const shape = {
	x: 0,
	y: 0,
	area: function() {
		return this.width * this.height;
	},
};

// Child object
export const rectangle = Object.create(shape);
rectangle.x = 5;
rectangle.y = 10;
rectangle.width = 10;
rectangle.height = 20;

// Child object
export const square = Object.create(shape);
