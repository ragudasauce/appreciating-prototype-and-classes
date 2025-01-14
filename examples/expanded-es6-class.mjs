// Super Class
export class Shape {
    static metricInch = 25.4;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static fromMetric(num) {
        return num * this.metricInch;
    }

    static toMetric(num) {
        return num / this.metricInch;
    }

    move(x = 0, y = 0) {
        this.x += x;
        this.y += y;
    }

    get standardInch() {
        return Shape.metricInch;
    }
}

// Child Class
export class Rectangle extends Shape {
    // this is a standard inch in mm.
    standardWidth;
    standardHeight;

    constructor(x = 0, y = 0, width = 0, height = 0) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    // class method (appears on prototype)
    area() {
        return this.width * this.height;
    }

    // class getter/setter (appears on prototype)

    set width(num) {
        this.standardWidth = Shape.toMetric(num);
    }

    get width() {
        return Shape.fromMetric(this.standardWidth);
    }

    set height(num) {
        this.standardHeight = Shape.toMetric(num);
    }

    get height() {
        return Shape.fromMetric(this.standardHeight);
    }
}

// Extended
export class Square extends Rectangle {
    // private instance field
    #side;
    constructor(x = 0, y = 0, side = 0) {
        super(x, y, side, side);
        this.side = side;
    }

    get side() {
        return Shape.fromMetric(this.#side);
    }

    set side(num) {
        this.#side = Shape.toMetric(num);
        this.width = num;
        this.height = num;
    }
}
