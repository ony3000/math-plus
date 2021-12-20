import MathPlus from '../src';

describe('Check the state of both objects.', () => {
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
