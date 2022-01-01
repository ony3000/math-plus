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

  describe('The methods must have the same functionality.', () => {
    describe('function abs; returns the absolute value of a number', () => {
      const originalFunction = Math.abs;
      const extendedFunction = MathPlus.abs;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a numeric value returns the absolute value', () => {
        expect(extendedFunction('-1')).toBe(originalFunction('-1'));
        expect(extendedFunction(-2)).toBe(originalFunction(-2));

        expect(extendedFunction('-1')).toBe(1);
        expect(extendedFunction(-2)).toBe(2);
      });

      testIf(isDefinedAsFunction, 'passing an empty object, an array with more than one member, a non-numeric string, undefined or empty parameter returns NaN', () => {
        expect(extendedFunction({})).toBe(originalFunction({}));
        expect(extendedFunction([1, 2])).toBe(originalFunction([1, 2]));
        expect(extendedFunction('string')).toBe(originalFunction('string'));
        expect(extendedFunction(undefined)).toBe(originalFunction(undefined));
        expect(extendedFunction()).toBe(originalFunction());

        expect(extendedFunction({})).toBe(NaN);
        expect(extendedFunction([1, 2])).toBe(NaN);
        expect(extendedFunction('string')).toBe(NaN);
        expect(extendedFunction(undefined)).toBe(NaN);
        expect(extendedFunction()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing null, an empty string or an empty array returns 0', () => {
        expect(extendedFunction(null)).toBe(originalFunction(null));
        expect(extendedFunction('')).toBe(originalFunction(''));
        expect(extendedFunction([])).toBe(originalFunction([]));

        expect(extendedFunction(null)).toBe(0);
        expect(extendedFunction('')).toBe(0);
        expect(extendedFunction([])).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => extendedFunction(-2n)).toThrow();
        expect(() => extendedFunction(1n)).toThrow();
      });

      describeIf(isDefinedAsFunction, 'passing an array with only one member is almost the same as passing that member as is, but...', () => {
        test('a numeric value returns the absolute value', () => {
          expect(extendedFunction(['-1'])).toBe(originalFunction(['-1']));
          expect(extendedFunction([-2])).toBe(originalFunction([-2]));

          expect(extendedFunction(['-1'])).toBe(1);
          expect(extendedFunction([-2])).toBe(2);
        });

        test('an empty object, an array with more than one member or a non-numeric string returns NaN', () => {
          expect(extendedFunction([{}])).toBe(originalFunction([{}]));
          expect(extendedFunction([[1, 2]])).toBe(originalFunction([[1, 2]]));
          expect(extendedFunction(['string'])).toBe(originalFunction(['string']));

          expect(extendedFunction([{}])).toBe(NaN);
          expect(extendedFunction([[1, 2]])).toBe(NaN);
          expect(extendedFunction(['string'])).toBe(NaN);
        });

        test('[!] undefined not return NaN, and returns 0', () => {
          expect(extendedFunction([undefined])).toBe(originalFunction([undefined]));

          expect(extendedFunction([undefined])).toBe(0);
        });

        test('null, an empty string or an empty array returns 0', () => {
          expect(extendedFunction([null])).toBe(originalFunction([null]));
          expect(extendedFunction([''])).toBe(originalFunction(['']));
          expect(extendedFunction([[]])).toBe(originalFunction([[]]));

          expect(extendedFunction([null])).toBe(0);
          expect(extendedFunction([''])).toBe(0);
          expect(extendedFunction([[]])).toBe(0);
        });

        test('[!] a bigint not throw error, and returns the absolute value', () => {
          expect(extendedFunction([-2n])).toBe(originalFunction([-2n]));
          expect(extendedFunction([1n])).toBe(originalFunction([1n]));

          expect(extendedFunction([-2n])).toBe(2);
          expect(extendedFunction([1n])).toBe(1);
        });
      });
    });

    describe('function acos; returns the arc-cosine (in radians) of a number', () => {
      const originalFunction = Math.acos;
      const extendedFunction = MathPlus.acos;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number between -1 and 1 returns the arc-cosine of the given number', () => {
        expect(extendedFunction(-1)).toBe(originalFunction(-1));
        expect(extendedFunction(0)).toBe(originalFunction(0));
        expect(extendedFunction(1)).toBe(originalFunction(1));

        expect(extendedFunction(-1)).toBe(Math.PI);
        expect(extendedFunction(0)).toBe(Math.PI / 2);
        expect(extendedFunction(1)).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing a number less than -1 or greater than 1 returns NaN', () => {
        expect(extendedFunction(-2)).toBe(originalFunction(-2));
        expect(extendedFunction(2)).toBe(originalFunction(2));

        expect(extendedFunction(-2)).toBe(NaN);
        expect(extendedFunction(2)).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing null, an empty string or an empty array returns the arc-cosine of 0', () => {
        expect(extendedFunction(null)).toBe(originalFunction(null));
        expect(extendedFunction('')).toBe(originalFunction(''));
        expect(extendedFunction([])).toBe(originalFunction([]));

        expect(extendedFunction(null)).toBe(Math.PI / 2);
        expect(extendedFunction('')).toBe(Math.PI / 2);
        expect(extendedFunction([])).toBe(Math.PI / 2);
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value (except the three above) returns NaN', () => {
        expect(extendedFunction({})).toBe(originalFunction({}));
        expect(extendedFunction([1, 2])).toBe(originalFunction([1, 2]));
        expect(extendedFunction('string')).toBe(originalFunction('string'));
        expect(extendedFunction()).toBe(originalFunction());

        expect(extendedFunction({})).toBe(NaN);
        expect(extendedFunction([1, 2])).toBe(NaN);
        expect(extendedFunction('string')).toBe(NaN);
        expect(extendedFunction()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => extendedFunction(-1n)).toThrow();
        expect(() => extendedFunction(0n)).toThrow();
        expect(() => extendedFunction(1n)).toThrow();
      });
    });

    describe('function acosh; returns the hyperbolic arc-cosine of a number', () => {
      const originalFunction = Math.acosh;
      const extendedFunction = MathPlus.acosh;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number greater than or equal to 1 returns the hyperbolic arc-cosine of the given number', () => {
        expect(extendedFunction(1)).toBe(originalFunction(1));
        expect(extendedFunction(2)).toBe(originalFunction(2));

        expect(extendedFunction(1)).toBe(0);
        expect(extendedFunction(2)).toBe(Math.log(2 + Math.sqrt(2 ** 2 - 1)));
      });

      testIf(isDefinedAsFunction, 'passing a number less than 1 returns NaN', () => {
        expect(extendedFunction(-1)).toBe(originalFunction(-1));
        expect(extendedFunction(0)).toBe(originalFunction(0));
        expect(extendedFunction(0.5)).toBe(originalFunction(0.5));

        expect(extendedFunction(-1)).toBe(NaN);
        expect(extendedFunction(0)).toBe(NaN);
        expect(extendedFunction(0.5)).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value returns NaN', () => {
        expect(extendedFunction(null)).toBe(originalFunction(null));
        expect(extendedFunction('')).toBe(originalFunction(''));
        expect(extendedFunction([])).toBe(originalFunction([]));
        expect(extendedFunction({})).toBe(originalFunction({}));
        expect(extendedFunction([1, 2])).toBe(originalFunction([1, 2]));
        expect(extendedFunction('string')).toBe(originalFunction('string'));
        expect(extendedFunction()).toBe(originalFunction());

        expect(extendedFunction(null)).toBe(NaN);
        expect(extendedFunction('')).toBe(NaN);
        expect(extendedFunction([])).toBe(NaN);
        expect(extendedFunction({})).toBe(NaN);
        expect(extendedFunction([1, 2])).toBe(NaN);
        expect(extendedFunction('string')).toBe(NaN);
        expect(extendedFunction()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => extendedFunction(1n)).toThrow();
        expect(() => extendedFunction(2n)).toThrow();
      });
    });
  });
});
