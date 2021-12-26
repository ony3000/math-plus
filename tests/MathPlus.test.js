import MathPlus, { constantProps, methodProps } from '../src';

const describeIf = (
  condition,
  name,
  fn,
) => (condition ? describe(name, fn) : describe.skip(name, fn));

const testIf = (
  condition,
  name,
  fn,
  timeout,
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
    constantProps.forEach((prop) => {
      describe(`number ${prop}`, () => {
        const isDefinedAsNumber = typeof MathPlus[prop] === 'number';

        test('is defined as a number', () => {
          expect(isDefinedAsNumber).toBe(true);
        });

        describeIf(isDefinedAsNumber, 'has same property descriptors', () => {
          const plusPropDescriptor = Object.getOwnPropertyDescriptor(MathPlus, prop);
          const originPropDescriptor = Object.getOwnPropertyDescriptor(Math, prop);
          const areDescriptorsValid = (
            plusPropDescriptor !== undefined && originPropDescriptor !== undefined
          );

          testIf(areDescriptorsValid, 'configurable', () => {
            expect(plusPropDescriptor.configurable).toBe(originPropDescriptor.configurable);
          });

          testIf(areDescriptorsValid, 'enumerable', () => {
            expect(plusPropDescriptor.enumerable).toBe(originPropDescriptor.enumerable);
          });

          testIf(areDescriptorsValid, 'writable', () => {
            expect(plusPropDescriptor.writable).toBe(originPropDescriptor.writable);
          });
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

        describeIf(isDefinedAsFunction, 'has same property descriptors', () => {
          const plusPropDescriptor = Object.getOwnPropertyDescriptor(MathPlus, prop);
          const originPropDescriptor = Object.getOwnPropertyDescriptor(Math, prop);
          const areDescriptorsValid = (
            plusPropDescriptor !== undefined && originPropDescriptor !== undefined
          );

          testIf(areDescriptorsValid, 'configurable', () => {
            expect(plusPropDescriptor.configurable).toBe(originPropDescriptor.configurable);
          });

          testIf(areDescriptorsValid, 'enumerable', () => {
            expect(plusPropDescriptor.enumerable).toBe(originPropDescriptor.enumerable);
          });

          testIf(areDescriptorsValid, 'writable', () => {
            expect(plusPropDescriptor.writable).toBe(originPropDescriptor.writable);
          });
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
});
