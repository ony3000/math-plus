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

      testIf(isDefinedAsFunction, 'passing a numeric value (except bigint)', () => {
        expect(extendedFunction('-1')).toBe(originalFunction('-1'));
        expect(extendedFunction(-2)).toBe(originalFunction(-2));
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
        expect(extendedFunction(null)).toBe(originalFunction(null));
        expect(extendedFunction('')).toBe(originalFunction(''));
        expect(extendedFunction([])).toBe(originalFunction([]));
        expect(extendedFunction({})).toBe(originalFunction({}));
        expect(extendedFunction([1, 2])).toBe(originalFunction([1, 2]));
        expect(extendedFunction('string')).toBe(originalFunction('string'));
        expect(extendedFunction(undefined)).toBe(originalFunction(undefined));
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => extendedFunction(-2n)).toThrow();
        expect(() => extendedFunction(1n)).toThrow();
      });

      describeIf(isDefinedAsFunction, 'passing an array with only one member is almost the same as passing that member as is', () => {
        test('an array with only one numeric value (except bigint)', () => {
          expect(extendedFunction(['-1'])).toBe(originalFunction(['-1']));
          expect(extendedFunction([-2])).toBe(originalFunction([-2]));
        });

        test('an array with only one non-numeric value', () => {
          expect(extendedFunction([null])).toBe(originalFunction([null]));
          expect(extendedFunction([''])).toBe(originalFunction(['']));
          expect(extendedFunction([[]])).toBe(originalFunction([[]]));
          expect(extendedFunction([{}])).toBe(originalFunction([{}]));
          expect(extendedFunction([[1, 2]])).toBe(originalFunction([[1, 2]]));
          expect(extendedFunction(['string'])).toBe(originalFunction(['string']));
          expect(extendedFunction([undefined])).toBe(originalFunction([undefined]));
        });

        test('[!] an array with only one bigint not throw error', () => {
          expect(extendedFunction([-2n])).toBe(originalFunction([-2n]));
          expect(extendedFunction([1n])).toBe(originalFunction([1n]));
        });
      });
    });

    describe('function acos; returns the arc-cosine (in radians) of a number', () => {
      const originalFunction = Math.acos;
      const extendedFunction = MathPlus.acos;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
        expect(extendedFunction(-2)).toBe(originalFunction(-2));
        expect(extendedFunction(-1)).toBe(originalFunction(-1));
        expect(extendedFunction(0)).toBe(originalFunction(0));
        expect(extendedFunction(0.5)).toBe(originalFunction(0.5));
        expect(extendedFunction(1)).toBe(originalFunction(1));
        expect(extendedFunction(2)).toBe(originalFunction(2));
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
        expect(extendedFunction(null)).toBe(originalFunction(null));
        expect(extendedFunction('')).toBe(originalFunction(''));
        expect(extendedFunction([])).toBe(originalFunction([]));
        expect(extendedFunction({})).toBe(originalFunction({}));
        expect(extendedFunction([1, 2])).toBe(originalFunction([1, 2]));
        expect(extendedFunction('string')).toBe(originalFunction('string'));
        expect(extendedFunction(undefined)).toBe(originalFunction(undefined));
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

      testIf(isDefinedAsFunction, 'passing a number', () => {
        expect(extendedFunction(-1)).toBe(originalFunction(-1));
        expect(extendedFunction(0)).toBe(originalFunction(0));
        expect(extendedFunction(0.5)).toBe(originalFunction(0.5));
        expect(extendedFunction(1)).toBe(originalFunction(1));
        expect(extendedFunction(2)).toBe(originalFunction(2));
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
        expect(extendedFunction(null)).toBe(originalFunction(null));
        expect(extendedFunction('')).toBe(originalFunction(''));
        expect(extendedFunction([])).toBe(originalFunction([]));
        expect(extendedFunction({})).toBe(originalFunction({}));
        expect(extendedFunction([1, 2])).toBe(originalFunction([1, 2]));
        expect(extendedFunction('string')).toBe(originalFunction('string'));
        expect(extendedFunction(undefined)).toBe(originalFunction(undefined));
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => extendedFunction(1n)).toThrow();
        expect(() => extendedFunction(2n)).toThrow();
      });
    });
  });
});
