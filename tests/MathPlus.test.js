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

  describe('The methods must have the same functionality.', () => {
    describe('function abs', () => {
      const isDefinedAsFunction = typeof MathPlus.abs === 'function';

      testIf(isDefinedAsFunction, 'returns the absolute value of a number', () => {
        expect(MathPlus.abs(-2)).toBe(2);
      });

      testIf(isDefinedAsFunction, 'passing a numeric string returns the same result as if it were treated as a number', () => {
        expect(MathPlus.abs('-1')).toBe(1);
      });

      testIf(isDefinedAsFunction, 'passing an empty object returns NaN', () => {
        expect(MathPlus.abs({})).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing an array with more than one member returns NaN', () => {
        expect(MathPlus.abs([1, 2])).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric string returns NaN', () => {
        expect(MathPlus.abs('string')).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing undefined or empty parameter returns NaN', () => {
        expect(MathPlus.abs()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing null returns 0', () => {
        expect(MathPlus.abs(null)).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing an empty string returns 0', () => {
        expect(MathPlus.abs('')).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing an empty array returns 0', () => {
        expect(MathPlus.abs([])).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => MathPlus.abs(1n)).toThrow();
      });

      describeIf(isDefinedAsFunction, 'passing an array with only one member is almost the same as passing that member as is, but...', () => {
        testIf(isDefinedAsFunction, 'a number returns the absolute value', () => {
          expect(MathPlus.abs([-2])).toBe(2);
        });

        testIf(isDefinedAsFunction, 'a numeric string returns the same result as if it were treated as a number', () => {
          expect(MathPlus.abs(['-1'])).toBe(1);
        });

        testIf(isDefinedAsFunction, 'an empty object returns NaN', () => {
          expect(MathPlus.abs([{}])).toBe(NaN);
        });

        testIf(isDefinedAsFunction, 'an array with more than one member returns NaN', () => {
          expect(MathPlus.abs([[1, 2]])).toBe(NaN);
        });

        testIf(isDefinedAsFunction, 'a non-numeric string returns NaN', () => {
          expect(MathPlus.abs(['string'])).toBe(NaN);
        });

        testIf(isDefinedAsFunction, '[!] undefined returns 0', () => {
          expect(MathPlus.abs([undefined])).toBe(0);
        });

        testIf(isDefinedAsFunction, 'null returns 0', () => {
          expect(MathPlus.abs([null])).toBe(0);
        });

        testIf(isDefinedAsFunction, 'an empty string returns 0', () => {
          expect(MathPlus.abs([''])).toBe(0);
        });

        testIf(isDefinedAsFunction, 'an empty array returns 0', () => {
          expect(MathPlus.abs([[]])).toBe(0);
        });

        testIf(isDefinedAsFunction, '[!] a bigint not throw error, and returns the same result as if it were treated as a number', () => {
          expect(MathPlus.abs([-1n])).toBe(1);
        });
      });
    });
  });
});
