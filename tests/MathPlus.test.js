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

    describe('function asin; returns the arc-sine (in radians) of a number', () => {
      const originalFunction = Math.asin;
      const extendedFunction = MathPlus.asin;
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

    describe('function asinh; returns the hyperbolic arc-sine of a number', () => {
      const originalFunction = Math.asinh;
      const extendedFunction = MathPlus.asinh;
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

    describe('function atan; returns the arc-tangent (in radians) of a number', () => {
      const originalFunction = Math.atan;
      const extendedFunction = MathPlus.atan;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
        expect(extendedFunction(1)).toBe(originalFunction(1));
        expect(extendedFunction(0)).toBe(originalFunction(0));
        expect(extendedFunction(-0)).toBe(originalFunction(-0));
        expect(extendedFunction(Infinity)).toBe(originalFunction(Infinity));
        expect(extendedFunction(-Infinity)).toBe(originalFunction(-Infinity));
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

    describe('function atan2; returns the angle in the plane (in radians) between the positive x-axis and the ray from (0,0) to the point (x,y), for `Math.atan2(y,x)`.', () => {
      const originalFunction = Math.atan2;
      const extendedFunction = MathPlus.atan2;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing numbers', () => {
        expect(extendedFunction(3, 4)).toBe(originalFunction(3, 4));
        expect(extendedFunction(4, 3)).toBe(originalFunction(4, 3));

        const arbitraryPositiveNumber = 1 / Math.random();
        const arbitraryFiniteNumber = 2 * Math.random() - 1;
        const arbitraryFinitePositiveNumber = Math.abs(arbitraryFiniteNumber) + 1;

        expect(extendedFunction(0, -0)).toBe(originalFunction(0, -0));
        expect(extendedFunction(-0, -0)).toBe(originalFunction(-0, -0));
        expect(extendedFunction(0, 0)).toBe(originalFunction(0, 0));
        expect(extendedFunction(-0, 0)).toBe(originalFunction(-0, 0));
        expect(extendedFunction(0, -arbitraryPositiveNumber)).toBe(originalFunction(0, -arbitraryPositiveNumber));
        expect(extendedFunction(-0, -arbitraryPositiveNumber)).toBe(originalFunction(-0, -arbitraryPositiveNumber));
        expect(extendedFunction(0, arbitraryPositiveNumber)).toBe(originalFunction(0, arbitraryPositiveNumber));
        expect(extendedFunction(-0, arbitraryPositiveNumber)).toBe(originalFunction(-0, arbitraryPositiveNumber));
        expect(extendedFunction(-arbitraryPositiveNumber, 0)).toBe(originalFunction(-arbitraryPositiveNumber, 0));
        expect(extendedFunction(-arbitraryPositiveNumber, -0)).toBe(originalFunction(-arbitraryPositiveNumber, -0));
        expect(extendedFunction(arbitraryPositiveNumber, 0)).toBe(originalFunction(arbitraryPositiveNumber, 0));
        expect(extendedFunction(arbitraryPositiveNumber, -0)).toBe(originalFunction(arbitraryPositiveNumber, -0));
        expect(extendedFunction(arbitraryFinitePositiveNumber, -Infinity)).toBe(originalFunction(arbitraryFinitePositiveNumber, -Infinity));
        expect(extendedFunction(-arbitraryFinitePositiveNumber, -Infinity)).toBe(originalFunction(-arbitraryFinitePositiveNumber, -Infinity));
        expect(extendedFunction(arbitraryFinitePositiveNumber, Infinity)).toBe(originalFunction(arbitraryFinitePositiveNumber, Infinity));
        expect(extendedFunction(-arbitraryFinitePositiveNumber, Infinity)).toBe(originalFunction(-arbitraryFinitePositiveNumber, Infinity));
        expect(extendedFunction(Infinity, arbitraryFiniteNumber)).toBe(originalFunction(Infinity, arbitraryFiniteNumber));
        expect(extendedFunction(-Infinity, arbitraryFiniteNumber)).toBe(originalFunction(-Infinity, arbitraryFiniteNumber));
        expect(extendedFunction(Infinity, -Infinity)).toBe(originalFunction(Infinity, -Infinity));
        expect(extendedFunction(-Infinity, -Infinity)).toBe(originalFunction(-Infinity, -Infinity));
        expect(extendedFunction(Infinity, Infinity)).toBe(originalFunction(Infinity, Infinity));
        expect(extendedFunction(-Infinity, Infinity)).toBe(originalFunction(-Infinity, Infinity));
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => extendedFunction(1, 1n)).toThrow();
        expect(() => extendedFunction(1n, 1)).toThrow();
        expect(() => extendedFunction(1n, 1n)).toThrow();
      });
    });

    describe('function atanh; returns the hyperbolic arc-tangent of a number', () => {
      const originalFunction = Math.atanh;
      const extendedFunction = MathPlus.atanh;
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

    describe('function cbrt; returns the cube root of a number', () => {
      const originalFunction = Math.cbrt;
      const extendedFunction = MathPlus.cbrt;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
      });
    });

    describe('function ceil; always rounds a number up to the next largest integer', () => {
      const originalFunction = Math.ceil;
      const extendedFunction = MathPlus.ceil;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
      });
    });

    describe('function clz32; returns the number of leading zero bits in the 32-bit binary representation of a number', () => {
      const originalFunction = Math.clz32;
      const extendedFunction = MathPlus.clz32;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
      });
    });

    describe('function cos; returns the cosine of the specified angle (in radians)', () => {
      const originalFunction = Math.cos;
      const extendedFunction = MathPlus.cos;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
      });
    });

    describe('function cosh; returns the hyperbolic cosine of a number', () => {
      const originalFunction = Math.cosh;
      const extendedFunction = MathPlus.cosh;
      const isDefinedAsFunction = typeof extendedFunction === 'function';

      testIf(isDefinedAsFunction, 'passing a number', () => {
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value', () => {
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
      });
    });
  });
});
