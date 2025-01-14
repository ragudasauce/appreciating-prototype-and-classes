// examples/create-objects.mjs

// Create an object literal with a default property
export const literalObj = { a: 1 };

// Create an object with the `new` keyword with Object (available since 2015)
export const newObj = new Object(); // returns {}
export const surprise = new Object(1); // returns Number{1} !!

// Create an object with a function
export function ObjectConstructor(a = 1) { return { a }}
export const constructed = new ObjectConstructor(); // returns { a: 1 }

// Create an object by combining two objects
export const assignObj = Object.assign({...literalObj}, { b: 5, c: 6 });
export const spreadObj = { ...literalObj, b: 5, c: 6 };

// Create and extend a child object from a parent
export const inheritObj = Object.create(assignObj);

/* Add properties through assignment */
inheritObj.b = 2;

/* Add properties through a method */
Object.defineProperty(inheritObj, 'c', { 
  value: 3, enumberable: true, writable: true, configurable: true
});


// Create an object with multiple data types
export const mixedObj = {
  a: 1,
  b: 'two',
  c: true,
  d: null,
  e: undefined,
  f: { nested: true },
  g: function inline() {},
};