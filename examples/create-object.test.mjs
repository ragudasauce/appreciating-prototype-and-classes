import { describe, expect, test } from 'vitest';
import { literalObj, assignObj, spreadObj, inheritObj, newObj, surprise, ObjectConstructor, constructed, mixedObj } from './create-object.mjs';


describe('Objects in Javascript', () => {
    describe('can be defined', () => {
        test('through object literals', () => {
            expect(typeof literalObj).toBe('object');
            expect(literalObj).toEqual({ a: 1});
        });
    
        test('through Object.new()', () => {
            expect(typeof newObj).toBe('object');
            expect(newObj).toEqual({});
    
            // calling new Object(1) returns a [[ Number ]]
            expect(typeof surprise).toBe('object');
            expect(surprise).toEqual(new Number(1));
        });
    
        test('through a constructor function', () => {
            expect(constructed).toEqual({ a: 1 })
            expect(typeof constructed).toBe('object');
    
            // ObjectConstructor() is defined to return a new object, not an instance.
            expect(constructed instanceof ObjectConstructor).toBe(false);
        });
    
        test('through combining objects', () => {
            const expected = { a: 1, b:5, c:6 };
            expect(assignObj).toEqual(expected);
            expect(spreadObj).toEqual(expected)
        });
    
        test('through Object.create()', () => {
            expect(Object.getPrototypeOf(inheritObj) === assignObj);
            expect(inheritObj).toEqual({ b: 2 });
    
            // Inherited properties come from traversing the prototype chain.
            expect(inheritObj.a).toBe(1);
            expect(inheritObj.c).toBe(3);
        })

    })

    describe('can contain', () => {

        test('numbers', () => {
            const prop = mixedObj.a;
            expect(prop).toBe(1);
            expect(typeof prop).toBe('number');
        });
    
        test('strings', () => {
            const prop = mixedObj.b;
            expect(prop).toBe('two');
            expect(typeof prop).toBe('string');
        });
    
        test('booleans', () => {      
            const prop = mixedObj.c;
            expect(prop).toBe(true);
            expect(typeof prop).toBe('boolean');
        });
    
        test('null', () => {
            const prop = mixedObj.d;
            expect(prop).toBe(null);
            expect(typeof prop).toBe('object');
        });

        test('undefined', () => {
            const prop = mixedObj.e;
            expect(prop).toBeUndefined();
        });

        test('objects', () => {
            const prop = mixedObj.f;
            expect(prop).toEqual({ nested: true });
            expect(typeof prop).toBe('object');
        });

        test('functions', () => {
            const prop = mixedObj.g;
            // functions don't serialize and aren't comparable.
            // so no .toEqual.
            expect(typeof prop).toBe('function');
        });
    });
})