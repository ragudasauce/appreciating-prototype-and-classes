import { shape, rectangle, square } from './inheritable-objects.mjs';
import { Shape as LShape, Rectangle as LRectangle, Square as LSquare } from './simple-prototype-class.mjs';
import { Shape as EShape, Rectangle as ERectangle, Square as ESquare } from './simple-es6-class.mjs';
import { Shape as LXShape, Rectangle as LXRectangle, Square as LXSquare } from './expanded-prototype-class.mjs';
import { Shape as EXShape, Rectangle as EXRectangle, Square as EXSquare } from './expanded-es6-class.mjs';

const classFormat = 'color: blue; padding-block-start: 3em; font-size: 1.125em;';
const instanceFormat = 'color: royalblue; padding-block-start: 1em;';

console.info('%cExample: Inheritable Objects',  classFormat);
console.dir(square);
console.dir(rectangle);
console.dir(shape);

console.info('%cExample: Simple Prototype Class',  classFormat);
console.dir(LSquare);
console.dir(LRectangle);
console.dir(LShape);

console.info('%cInstances',  instanceFormat);
console.dir(new LSquare(2, 4, 10));
console.dir(new LRectangle(2, 4, 10, 20));
console.dir(new LShape(2, 4));

console.info('%cExample: simple es6 class',  classFormat);
console.dir(ESquare);
console.dir(ERectangle);
console.dir(EShape);

console.info('%cInstances',  instanceFormat);
console.dir(new ESquare(2, 4, 10));
console.dir(new ERectangle(2, 4, 10, 20));
console.dir(new EShape(2, 4));

console.info('%cExample: expanded prototype class', classFormat);
console.dir(LXSquare);
console.dir(LXRectangle);
console.dir(LXShape);

console.info('%cInstances', instanceFormat);
console.dir(new LXSquare(2, 4, 10));
console.dir(new LXRectangle(2, 4, 10, 20));
console.dir(new LXShape(2, 4));


console.info('%cExample: expanded es6 class', classFormat);
console.dir(EXSquare);
console.dir(EXRectangle);
console.dir(EXShape);

console.info('%cInstances', instanceFormat);
console.dir(new EXSquare(2, 4, 10));
console.dir(new EXRectangle(2, 4, 10, 20));
console.dir(new EXShape(2, 4));
