import MathPlus, { constantProperties, methodProperties } from '../src';

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

  describe('`MathPlus` must contain the property descriptors of `Math`.', () => {
    const plusObjectDescriptors = Object.getOwnPropertyDescriptors(MathPlus);

    Object
      .entries(Object.getOwnPropertyDescriptors(Math))
      .forEach(([property, descriptor]: [string, PropertyDescriptor]) => {
        test(`${typeof descriptor.value} ${property}`, () => {
          const isSameDescriptors = (
            plusObjectDescriptors[property]?.configurable === descriptor.configurable
            && plusObjectDescriptors[property]?.enumerable === descriptor.enumerable
            && plusObjectDescriptors[property]?.writable === descriptor.writable
          );

          expect(isSameDescriptors).toBe(true);
        });
      });
  });

  describe('`MathPlus` must contain the constants of `Math`.', () => {
    constantProperties.forEach((property) => {
      test(`number ${property}`, () => {
        expect(MathPlus[property]).toBe(Math[property]);
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
