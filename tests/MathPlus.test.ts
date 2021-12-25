import MathPlus, { constantProperties, methodProperties } from '../src';

const describeIf = (
  condition: boolean,
  name: string | number | Function | jest.FunctionLike,
  fn: jest.EmptyFunction,
) => (condition ? describe(name, fn) : describe.skip(name, fn));

const testIf = (
  condition: boolean,
  name: string,
  fn?: jest.ProvidesCallback | undefined,
  timeout?: number | undefined,
) => (condition ? test(name, fn, timeout) : test.skip(name, fn, timeout));

describe('The same functionality as the built-in object `Math` should be guaranteed.', () => {
  describe('Both objects must have the same characteristics.', () => {
    test('isExtensible', () => {
      expect(Object.isExtensible(MathPlus)).toBe(Object.isExtensible(Math));
    });

    test('isSealed', () => {
      expect(Object.isSealed(MathPlus)).toBe(Object.isSealed(Math));
    });

    test('isFrozen', () => {
      expect(Object.isFrozen(MathPlus)).toBe(Object.isFrozen(Math));
    });
  });

  describe('`MathPlus` must contain the constants of `Math`.', () => {
    constantProperties.forEach((property) => {
      describe(`number ${property}`, () => {
        const isDefinedAsNumber = typeof MathPlus[property] === 'number';

        test('is defined as a number', () => {
          expect(isDefinedAsNumber).toBe(true);
        });

        describeIf(isDefinedAsNumber, 'has same property descriptors', () => {
          const plusPropertyDescriptor = Object.getOwnPropertyDescriptor(MathPlus, property);
          const originPropertyDescriptor = Object.getOwnPropertyDescriptor(Math, property);

          if (plusPropertyDescriptor !== undefined && originPropertyDescriptor !== undefined) {
            test('configurable', () => {
              expect(plusPropertyDescriptor.configurable).toBe(originPropertyDescriptor.configurable);
            });

            test('enumerable', () => {
              expect(plusPropertyDescriptor.enumerable).toBe(originPropertyDescriptor.enumerable);
            });

            test('writable', () => {
              expect(plusPropertyDescriptor.writable).toBe(originPropertyDescriptor.writable);
            });
          }
        });

        testIf(isDefinedAsNumber, 'has same value', () => {
          expect(MathPlus[property]).toBe(Math[property]);
        });
      });
    });
  });

  describe('`MathPlus` must contain the methods of `Math`.', () => {
    methodProperties.forEach((property) => {
      describe(`function ${property}`, () => {
        const isDefinedAsFunction = typeof MathPlus[property] === 'function';

        test('is defined as a function', () => {
          expect(isDefinedAsFunction).toBe(true);
        });

        describeIf(isDefinedAsFunction, 'has same property descriptors', () => {
          const plusPropertyDescriptor = Object.getOwnPropertyDescriptor(MathPlus, property);
          const originPropertyDescriptor = Object.getOwnPropertyDescriptor(Math, property);

          if (plusPropertyDescriptor !== undefined && originPropertyDescriptor !== undefined) {
            test('configurable', () => {
              expect(plusPropertyDescriptor.configurable).toBe(originPropertyDescriptor.configurable);
            });

            test('enumerable', () => {
              expect(plusPropertyDescriptor.enumerable).toBe(originPropertyDescriptor.enumerable);
            });

            test('writable', () => {
              expect(plusPropertyDescriptor.writable).toBe(originPropertyDescriptor.writable);
            });
          }
        });

        testIf(isDefinedAsFunction, 'has no prototype', () => {
          expect(MathPlus[property].prototype).toBe(Math[property].prototype);
        });

        testIf(isDefinedAsFunction, 'has same number of expected parameters', () => {
          expect(MathPlus[property].length).toBe(Math[property].length);
        });
      });
    });
  });
});
