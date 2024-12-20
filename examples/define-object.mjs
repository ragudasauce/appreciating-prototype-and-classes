export const basicObject = {};

basicObject.a = 1;

Object.defineProperty(basicObject, 'b', { value: 2, writable: true });
