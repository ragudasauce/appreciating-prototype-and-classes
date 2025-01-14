// import { shape, rectangle, square } from './inherited-example.mjs';
// import { mixedObj } from './basic-example.mjs';
import { Shape as LShape, Rectangle as LRectangle, Square as LSquare } from './legacy-class.mjs';
import { Shape as EShape, Rectangle as ERectangle, Square as ESquare } from './es6-simple-class.mjs';
import { Shape, Rectangle, Square } from './es6-expanded-class.mjs';
// import { constructorObj } from './basic-example.mjs';

// const child = Object.create(constructorObj);
// child.constructor(3, 4);
// console.dir(constructorObj);
// console.dir(child);

// console.log(constructorObj.constructor(3, 4));

// console.log('example 1');
// console.dir(square);
// console.dir(rectangle);
// console.dir(shape);
//
// console.dir(mixedObj);

console.log('example2, constructor class');
console.dir(LSquare);
// console.dir(ESquare);
console.dir(Square);
console.log('legacy rectangle');
console.dir(LRectangle);
console.log('legacy instances=');
console.log(new LRectangle());
// console.dir(ERectangle);
console.dir(Rectangle);
// console.dir(LShape);
// console.dir(EShape);
console.dir(Shape);

console.log('example 2, instances');
//
const squareInstance = new Square(0, 0, 15);
const rectInstance = new Rectangle(0, 0, 20, 40);
const shapeInstance = new Shape();
// console.log(new Square());
console.dir(squareInstance);
// console.dir(new Rectangle());
console.dir(rectInstance);
console.dir(shapeInstance);
// console.log(shapeInstance.area());

// console.dir(Array);
// console.dir(new Array());
// //
// function basic() {}
//
// console.dir(basic);
//
// console.log(new Object(1));
