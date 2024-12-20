import { basicObject } from './define-object.mjs';

const mod = { b: 5, c: 3 };

export const comboObject = Object.assign(basicObject, mod);
