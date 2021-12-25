import MathPlus, { constantProperties } from '../src';

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
});
