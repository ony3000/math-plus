import MathPlus, { constantProps, methodProps } from '../src';

const describeIf = (condition, ...args) => (condition ? describe(...args) : describe.skip(...args));

const testIf = (condition, ...args) => (condition ? test(...args) : test.skip(...args));

describe('The same functionality as the built-in object `Math` should be guaranteed.', () => {
  test('Both objects must have the same characteristics.', () => {
    expect(Object.isExtensible(MathPlus)).toBe(Object.isExtensible(Math));
    expect(Object.isSealed(MathPlus)).toBe(Object.isSealed(Math));
    expect(Object.isFrozen(MathPlus)).toBe(Object.isFrozen(Math));
  });

  describe('`MathPlus` must contain the constants of `Math`.', () => {
    constantProps.forEach((prop) => {
      describe(`number ${prop}`, () => {
        const isDefinedAsNumber = typeof MathPlus[prop] === 'number';

        test('is defined as a number', () => {
          expect(isDefinedAsNumber).toBe(true);
        });

        testIf(isDefinedAsNumber, 'has same property descriptors', () => {
          const plusPropDescriptor = Object.getOwnPropertyDescriptor(MathPlus, prop);
          const originPropDescriptor = Object.getOwnPropertyDescriptor(Math, prop);

          expect(plusPropDescriptor.configurable).toBe(originPropDescriptor.configurable);
          expect(plusPropDescriptor.enumerable).toBe(originPropDescriptor.enumerable);
          expect(plusPropDescriptor.writable).toBe(originPropDescriptor.writable);
        });

        testIf(isDefinedAsNumber, 'has same value', () => {
          expect(MathPlus[prop]).toBe(Math[prop]);
        });
      });
    });
  });

  describe('`MathPlus` must contain the methods of `Math`.', () => {
    methodProps.forEach((prop) => {
      describe(`function ${prop}`, () => {
        const isDefinedAsFunction = typeof MathPlus[prop] === 'function';

        test('is defined as a function', () => {
          expect(isDefinedAsFunction).toBe(true);
        });

        testIf(isDefinedAsFunction, 'has same property descriptors', () => {
          const plusPropDescriptor = Object.getOwnPropertyDescriptor(MathPlus, prop);
          const originPropDescriptor = Object.getOwnPropertyDescriptor(Math, prop);

          expect(plusPropDescriptor.configurable).toBe(originPropDescriptor.configurable);
          expect(plusPropDescriptor.enumerable).toBe(originPropDescriptor.enumerable);
          expect(plusPropDescriptor.writable).toBe(originPropDescriptor.writable);
        });

        testIf(isDefinedAsFunction, 'has same prototype (as undefined)', () => {
          expect(MathPlus[prop].prototype).toBe(Math[prop].prototype);
        });

        testIf(isDefinedAsFunction, 'has same number of expected parameters', () => {
          expect(MathPlus[prop].length).toBe(Math[prop].length);
        });
      });
    });
  });

  describe('`MathPlus` must contain the string valued property that is used in the creation of the default string description of an object', () => {
    const prop = Symbol.toStringTag;
    const isDefinedAsString = typeof MathPlus[prop] === 'string';

    test('is defined as a string', () => {
      expect(isDefinedAsString).toBe(true);
    });

    testIf(isDefinedAsString, 'has same property descriptors', () => {
      const plusPropDescriptor = Object.getOwnPropertyDescriptor(MathPlus, prop);
      const originPropDescriptor = Object.getOwnPropertyDescriptor(Math, prop);

      expect(plusPropDescriptor.configurable).toBe(originPropDescriptor.configurable);
      expect(plusPropDescriptor.enumerable).toBe(originPropDescriptor.enumerable);
      expect(plusPropDescriptor.writable).toBe(originPropDescriptor.writable);
    });

    testIf(isDefinedAsString, 'has the name `MathPlus`', () => {
      expect(MathPlus[prop]).toBe('MathPlus');
    });
  });
});
