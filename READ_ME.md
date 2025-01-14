# JavaScript: A Deeper Appreciation of the Prototype and Classes

Channeling my inner Neal Stephenson to share a story inspired by another story I was researching and writing.

## Foreword

I started learning JavaScript way back in the early 2000s. At the time, I had started a design company and a family. I had some proficiency at HTML and CSS. Conceptually, they were a lot like Quark to me. But JavaScript escaped me. That's what my business partner and dev friends were for!

Then 9/11 happened. I lost all my customers. Nobody was hiring designers. I needed to keep the income flowing to my family. Out of desperation, I began learning JavaScript. 

I discovered I loved JavaScript. I gained a deeper understanding of the browser - the media I was designing for. As my career evolved and moved toward development, I found the most rewarding moments were connecting designer and developers, learning and sharing insights about the media to create better designs and interactions.

While writing a different article about dynamically creating web components, I wanted to make sure that what I wrote was accurate, not just my way of understanding it. I did a ton of research, learned a lot, and found a better appreciation of JavaScript's prototype model, JavaScript engines, and how classes are built on top of it. I've included a reading list below for those who want to go even deeper.

Let's start with the part I never bothered to learn.

## The Fundamentals

Object oriented programming languages have a common set of features. Objects, inheritance, polymorphism, and encapsulation exist in class based languages like Java and C++ and prototype based languages like JavaScript.

Class based languages create objects from classes that define and type properties and methods on an object instance. Classes can be extended but the final object instance cannot. Objects are only instances of a class.

Prototype based languages like JavaScript forgo classes and treat objects as the primary entity. Objects can be created, combined, inherited, and extended, and contain whatever they need to without classes.

### Defining and Parsing Objects

You probably use one or more of the tactics below to create objects. If you're like me, you've probably logged just about everything in JavaScript and discovered that almost everything not a primitive value is an object.

Until I recently, I didn't fully appreciate what that meant.

```javascript
// examples/create-objects.mjs

// Create an object literal with a default property
export const literalObj = { a: 1 };

// Create an object by combining two objects
export const assignObj = Object.assign(literalObj, { b: 5, c: 6 });
export const spreadObj = { ...literalObj, b: 5, c: 6 };

// Create and extend a child object from a parent
export const inheritObj = Object.create(assignObj);
π
/* Add properties through assignment */
inheritObj.b = 2;

/* Add properties through a method */
Object.defineProperty(inheritObj, 'c', { 
  value: 3, enumberable: true, writable: true, configurable: true
});

// Create an object with the `new` keyword with Object (available since 2015)
export const newObj = new Object(); // returns {}
export const surprise = new Object(1); // returns Number{1} !!

// Create an object with a constructor function
export function ObjectConstructor = function(a = 1) { return { a }}
export const constructed = new ObjectConstructor(); // returns { a: 1 }

// Create an object with multiple data types
const mixedObj = {
  a: 1,
  b: 'two',
  c: true,
  d: null,
  e: undefined,
  f: { nested: true },
  g: function inline() {},
};
```

Prototype based languages use objects as a template - or prototype - to create child objects - or instances - which inherit properties by linking to the original object, providing the inheritance and polymorphism found in class based languages.

Let's look at how the mixedObj from our example above is parsed. 

Note: [[ Prototype ]] is a reference to the source an object inherits from. The prototype property is the object used as the source when creating instances.

Before doing this research, my mental model was different. I didn't know primitive values are always assigned while objects are created and passed as references. I thought the resulting object would mirror my code, much like what I saw in my logging.

My experience blinded me to the fact that when we define objects and  functions like mixedObj and inline respectively, we are creating instances from the Object and Function templates.

Consequently, I was surprised to see standalone objects, especially the inline.prototype object which seems to serve to no purpose.

Until I wanted to create classes dynamically, I never needed to understand the creation and linking of objects at this level. Once I did, I gained a real appreciation for how the [[ Prototype ]] chain and the prototype property are used as syntactic sugar to implement the class keyword.

### Prototype Inheritance

Creating custom objects that inherit properties from a source object is quite easy in Javascript. Any object created with Object.create(sourceObj) is automatically linked to the sourceObj prototype.

```javascript
// Parent object
const shape = {
 x: 0,
 y: 0,
 area: function() {
  return this.width * this.height;
 },
};

// Child object
const rectangle = Object.create(shape);
rectangle.x = 5;
rectangle.y = 10
rectangle.width = 20;
rectangle.height = 40;

// Child object
const square = Object.create(shape);

rectangle.area() // returns 20 * 40 = 800;
square.area() // returns NaN;
```

When we look at the parsed objects they look like classes. The rectangle inherits from shape through the hidden [[ Prototype ]] property and sets values for width, height, x, y without impacting shape or square.

However, these objects are not classes. While they display inheritance and polymorphism, a class is a template used to create objects. Our objects are nothing more than ad-hoc linked containers with variable structure.

## JavaScript Classes

While JavaScript doesn't have classes like Java or C++, it does have tactics that provide the inheritance, polymorphism, encapsulation, and consistency found in class based languages.

### Prototype Based Classes

Let's refactor our shape inheritance example to use JavaScript's default method to create classes: a constructor function that will be called with the new operator to create instances.

```javascript
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

// While all shapes have area,
// calculating it is specific to the type of shape.
Rectangle.prototype.area = function area() {
 return this.width * this.height;
};

// Extend the Super Class
Object.setPrototypeOf(Rectangle.prototype, Shape.prototype);

// Subclass Rectangle: every Square is a Rectangle,
// but not every Rectangle is a square!
export function Square(x = 0, y = 0, side = 0) {
 Rectangle.call(this, x, y, side, side);
}

// This was the way to set the prototype before
// Object.setPrototypeOf existed in the engine (2015)
Square.prototype = Object.create(Rectangle.prototype, {
 constructor: {
  value: Square,
  enumerable: false,
  writable: true,
  configurable: true,
 },
});
```

When we parse these objects, we get something very different.

These objects are [[ Function ]] instances, with a very simple, consistent structure. None of our data properties seem to be defined, other than the area function which exists on the constructor function's prototype object.

These objects are [[ Function ]] instances, with a very simple, consistent structure. This is our template. We defined x, y, width, and height to be assigned when the function runs, localizing and storing data in instances. We defined the area method as part of our function's prototype template, making it accessible to each instance through the linked prototype chain.

Let's create some instances with data by using the new operator.

```javascript
// create object instances
const square1 = new Square();
const square2 = new Square(5, 10, 15);

const rectangle1 = new Rectagle();
const rectangle2 = new Rectangle(10, 20, 20, 30);

const shape1 = new Shape();
const shape2 = new Shape(5, 10);
```

Immediately we notice more differences. Instead of setting the x, y, width, height properties on the rectangle object, we pass the values to the constructor function. This is a lot easier to read, write, and maintain.

Looking at our parsed instances, we see another difference.

Unlike the objects in our shape inheritance example, these objects are instances. They have consistent structure and scoped data created by their named Prototypes (constructor functions): Shape, Rectangle, or Square.

```javascript
// Prototype chain. Each class only sees classes to the right.
// Square -> Rectangle -> Shape -> Object

// call the area method
square1.area() // returns 0;
square2.area() // returns 15 * 15 = 225

rectangle1.area() // returns 0;
rectangle2.area() // returns 30 * 40 = 1200

shape1.area() // TypeError: not a function
shape2.area() // TypeError: not a function
```

With our data properly scoped and encapsulated, calling area on a Square or Rectangle instance returns a usable number. Shape instances error because area is not in its Prototype chain.

### The class Operator

Since 2015, JavaScript has included the class operator to simplify class definition. Let's refactor our Shape constructor function to use class.

```javascript
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
```

Much like our original refactor this code is a lot easier to read and write. We don't need to manually set the Prototype, or reset the value of this with call, or add global properties to the prototype.

Under the hood, the class operator handles all of that. It is syntactic sugar for a constructor function and does not introduce a new inheritance pattern or paradigm. In terms of functionality  and resources, constructors and classes are equivalent and will yield the same objects with the slight difference of [[ Class ]] being the Prototype instead of [[ Function ]].

## A Closer Look

Let's expand our example to include the all of the class members: getters, setters, methods, and class fields. Let's also include some static and private properties.

```javascript
// Super Class
export class Shape {
 static metricInch = 25.4;

 constructor(x = 0, y = 0) {
  this.x = x;
  this.y = y;
 }

 move(x = 0, y = 0) {
  this.x += x;
  this.y += y;
 }

 static toMetric(num) { return num / this.metricInch; }
 static fromMetric(num) { return num * this.metricInch; }

 get standardInch() {
  return this.metricInch;
 }
}

// Child Class
export class Rectangle extends Shape {
 standardWidth;
 standardHeight;

 constructor(x = 0, y = 0, width = 0, height = 0) {
  super(x, y);
  this.width = width;
  this.height = height;
 }

 area() { return this.width * this.height; }

 set width(num) { this.standardWidth = Shape.toMetric(num); }
 get width() { return Shape.fromMetric(this.standardWidth); }

 set height(num) { this.standardHeight = Shape.toMetric(num); }
 get height() { return Shape.fromMetric(this.standardHeight); }
}

// Extended
export class Square extends Rectangle {
 #side;
 constructor(x = 0, y = 0, side = 0) {
  super(x, y, side, side);
  this.#side = side;
 }
}
```

When parsed, we get a a mix of property locations.

This refactor introduced the static keyword which scopes public and private fields and methods to the class. metricInch,  fromMetric,  and toMetric are located in the Shape class itself. Those can only be called from the Shape class and will not appear in the Prototype chain.

Unless marked as private, functions - including getters and setters - are located in the class's prototype property and are available to each instance through its Prototype chain. 

Unless marked as static, primitive values and object will not be located in the class's prototype, but will be assigned when the instance is created.

Having written a lot of classes with the class operator over the years, I never realized the importance of a property's location. I was interested in its value. I didn't need this level of detail to know whether a property is a class or instance field. After all, I'd defined it to be one or the other.

Now that I've delved into it, I find it quite fascinating.

## Final Thoughts

JavaScript is a live, evolving language. 

There's a proposal for struct Object which (in terms of JavaScript tactics) is an evolution of class. The spec is worth a high level read and has some really interesting applications for web workers. The main difference is that struct instances are sealed, have a fixed immutable structure, and can't be extended which should create memory efficient objects.

Another evolution is a native decorator proposal that will interact with a class, a class field, a class method, or a class accessor (getters/setters). Throughout the proposal, they show examples that use the same tactics we show here like function.call() to set the scope of this and Class.prototype.someProperty to extend the decorator into the class as a public method.

JavaScript engines are really pretty incredible and quite clever. JavaScript engines link to and reuse objects that are the same. Imagine how many default function.prototype instances there are in a JavaScript app, and that's a lot of memory you're saving.

I started this journey looking for a way to create Web Components dynamically and came away with a real appreciation for how well designed, flexible, and future proof JavaScript is.

## Further Reading

Mathias Bynens and Benedikt Meurer published an in-depth article and video in 2018 on how JavaScript engines interpret, parse, and optimize code. If you want to go deep, it is excellent!

MDN documentation on Inheritance and the prototype chain.

MDN documentation on Classes.

James Shore's The Definitive Guide to Object-Oriented JavaScript. Recorded in 2013, everything is still relative. It is one of the best JavaScript resources out there. James does an amazing job simplifying the complexity while providing a deep level of detail.