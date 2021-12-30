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
      const isDefinedAsFunction = typeof MathPlus.abs === 'function';

      testIf(isDefinedAsFunction, 'passing a numeric value returns the absolute value', () => {
        expect(MathPlus.abs('-1')).toBe(Math.abs('-1'));
        expect(MathPlus.abs(-2)).toBe(Math.abs(-2));

        expect(MathPlus.abs('-1')).toBe(1);
        expect(MathPlus.abs(-2)).toBe(2);
      });

      testIf(isDefinedAsFunction, 'passing an empty object, an array with more than one member, a non-numeric string, undefined or empty parameter returns NaN', () => {
        expect(MathPlus.abs({})).toBe(Math.abs({}));
        expect(MathPlus.abs([1, 2])).toBe(Math.abs([1, 2]));
        expect(MathPlus.abs('string')).toBe(Math.abs('string'));
        expect(MathPlus.abs(undefined)).toBe(Math.abs(undefined));
        expect(MathPlus.abs()).toBe(Math.abs());

        expect(MathPlus.abs({})).toBe(NaN);
        expect(MathPlus.abs([1, 2])).toBe(NaN);
        expect(MathPlus.abs('string')).toBe(NaN);
        expect(MathPlus.abs(undefined)).toBe(NaN);
        expect(MathPlus.abs()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing null, an empty string or an empty array returns 0', () => {
        expect(MathPlus.abs(null)).toBe(Math.abs(null));
        expect(MathPlus.abs('')).toBe(Math.abs(''));
        expect(MathPlus.abs([])).toBe(Math.abs([]));

        expect(MathPlus.abs(null)).toBe(0);
        expect(MathPlus.abs('')).toBe(0);
        expect(MathPlus.abs([])).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => MathPlus.abs(-2n)).toThrow();
        expect(() => MathPlus.abs(1n)).toThrow();
      });

      describeIf(isDefinedAsFunction, 'passing an array with only one member is almost the same as passing that member as is, but...', () => {
        testIf(isDefinedAsFunction, 'a numeric value returns the absolute value', () => {
          expect(MathPlus.abs(['-1'])).toBe(Math.abs(['-1']));
          expect(MathPlus.abs([-2])).toBe(Math.abs([-2]));

          expect(MathPlus.abs(['-1'])).toBe(1);
          expect(MathPlus.abs([-2])).toBe(2);
        });

        testIf(isDefinedAsFunction, 'an empty object, an array with more than one member or a non-numeric string returns NaN', () => {
          expect(MathPlus.abs([{}])).toBe(Math.abs([{}]));
          expect(MathPlus.abs([[1, 2]])).toBe(Math.abs([[1, 2]]));
          expect(MathPlus.abs(['string'])).toBe(Math.abs(['string']));

          expect(MathPlus.abs([{}])).toBe(NaN);
          expect(MathPlus.abs([[1, 2]])).toBe(NaN);
          expect(MathPlus.abs(['string'])).toBe(NaN);
        });

        testIf(isDefinedAsFunction, '[!] undefined not return NaN, and returns 0', () => {
          expect(MathPlus.abs([undefined])).toBe(Math.abs([undefined]));

          expect(MathPlus.abs([undefined])).toBe(0);
        });

        testIf(isDefinedAsFunction, 'null, an empty string or an empty array returns 0', () => {
          expect(MathPlus.abs([null])).toBe(Math.abs([null]));
          expect(MathPlus.abs([''])).toBe(Math.abs(['']));
          expect(MathPlus.abs([[]])).toBe(Math.abs([[]]));

          expect(MathPlus.abs([null])).toBe(0);
          expect(MathPlus.abs([''])).toBe(0);
          expect(MathPlus.abs([[]])).toBe(0);
        });

        testIf(isDefinedAsFunction, '[!] a bigint not throw error, and returns the absolute value', () => {
          expect(MathPlus.abs([-2n])).toBe(Math.abs([-2n]));
          expect(MathPlus.abs([1n])).toBe(Math.abs([1n]));

          expect(MathPlus.abs([-2n])).toBe(2);
          expect(MathPlus.abs([1n])).toBe(1);
        });
      });
    });

    describe('function acos; returns the arc-cosine (in radians) of a number', () => {
      const isDefinedAsFunction = typeof MathPlus.acos === 'function';

      testIf(isDefinedAsFunction, 'passing a number between -1 and 1 returns the arc-cosine of the given number', () => {
        expect(MathPlus.acos(-1)).toBe(Math.acos(-1));
        expect(MathPlus.acos(0)).toBe(Math.acos(0));
        expect(MathPlus.acos(1)).toBe(Math.acos(1));

        expect(MathPlus.acos(-1)).toBe(Math.PI);
        expect(MathPlus.acos(0)).toBe(Math.PI / 2);
        expect(MathPlus.acos(1)).toBe(0);
      });

      testIf(isDefinedAsFunction, 'passing a number less than -1 or greater than 1 returns NaN', () => {
        expect(MathPlus.acos(-2)).toBe(Math.acos(-2));
        expect(MathPlus.acos(2)).toBe(Math.acos(2));

        expect(MathPlus.acos(-2)).toBe(NaN);
        expect(MathPlus.acos(2)).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing null, an empty string or an empty array returns the arc-cosine of 0', () => {
        expect(MathPlus.acos(null)).toBe(Math.acos(null));
        expect(MathPlus.acos('')).toBe(Math.acos(''));
        expect(MathPlus.acos([])).toBe(Math.acos([]));

        expect(MathPlus.acos(null)).toBe(Math.PI / 2);
        expect(MathPlus.acos('')).toBe(Math.PI / 2);
        expect(MathPlus.acos([])).toBe(Math.PI / 2);
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value (except the three above) returns NaN', () => {
        expect(MathPlus.acos({})).toBe(Math.acos({}));
        expect(MathPlus.acos([1, 2])).toBe(Math.acos([1, 2]));
        expect(MathPlus.acos('string')).toBe(Math.acos('string'));
        expect(MathPlus.acos()).toBe(Math.acos());

        expect(MathPlus.acos({})).toBe(NaN);
        expect(MathPlus.acos([1, 2])).toBe(NaN);
        expect(MathPlus.acos('string')).toBe(NaN);
        expect(MathPlus.acos()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => MathPlus.acos(-1n)).toThrow();
        expect(() => MathPlus.acos(0n)).toThrow();
        expect(() => MathPlus.acos(1n)).toThrow();
      });
    });

    describe('function acosh; returns the hyperbolic arc-cosine of a number', () => {
      const isDefinedAsFunction = typeof MathPlus.acosh === 'function';

      testIf(isDefinedAsFunction, 'passing a number greater than or equal to 1 returns the hyperbolic arc-cosine of the given number', () => {
        expect(MathPlus.acosh(1)).toBe(Math.acosh(1));
        expect(MathPlus.acosh(2)).toBe(Math.acosh(2));

        expect(MathPlus.acosh(1)).toBe(0);
        expect(MathPlus.acosh(2)).toBe(Math.log(2 + Math.sqrt(2 ** 2 - 1)));
      });

      testIf(isDefinedAsFunction, 'passing a number less than 1 returns NaN', () => {
        expect(MathPlus.acosh(-1)).toBe(Math.acosh(-1));
        expect(MathPlus.acosh(0)).toBe(Math.acosh(0));
        expect(MathPlus.acosh(0.5)).toBe(Math.acosh(0.5));

        expect(MathPlus.acosh(-1)).toBe(NaN);
        expect(MathPlus.acosh(0)).toBe(NaN);
        expect(MathPlus.acosh(0.5)).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a non-numeric value returns NaN', () => {
        expect(MathPlus.acosh(null)).toBe(Math.acosh(null));
        expect(MathPlus.acosh('')).toBe(Math.acosh(''));
        expect(MathPlus.acosh([])).toBe(Math.acosh([]));
        expect(MathPlus.acosh({})).toBe(Math.acosh({}));
        expect(MathPlus.acosh([1, 2])).toBe(Math.acosh([1, 2]));
        expect(MathPlus.acosh('string')).toBe(Math.acosh('string'));
        expect(MathPlus.acosh()).toBe(Math.acosh());

        expect(MathPlus.acosh(null)).toBe(NaN);
        expect(MathPlus.acosh('')).toBe(NaN);
        expect(MathPlus.acosh([])).toBe(NaN);
        expect(MathPlus.acosh({})).toBe(NaN);
        expect(MathPlus.acosh([1, 2])).toBe(NaN);
        expect(MathPlus.acosh('string')).toBe(NaN);
        expect(MathPlus.acosh()).toBe(NaN);
      });

      testIf(isDefinedAsFunction, 'passing a bigint throws error', () => {
        expect(() => MathPlus.acos(1n)).toThrow();
        expect(() => MathPlus.acos(2n)).toThrow();
      });
    });
  });
});
