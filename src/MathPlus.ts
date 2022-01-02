export interface MathPlusShape extends Math {
}

const MathPlus: MathPlusShape = {
  E: Math.E,
  LN10: Math.LN10,
  LN2: Math.LN2,
  LOG10E: Math.LOG10E,
  LOG2E: Math.LOG2E,
  PI: Math.PI,
  SQRT1_2: Math.SQRT1_2,
  SQRT2: Math.SQRT2,
  abs(x: number): number {
    return Math.abs(x);
  },
  acos(x: number): number {
    return Math.acos(x);
  },
  acosh(x: number): number {
    return Math.acosh(x);
  },
  asin(x: number): number {
    return Math.asin(x);
  },
  asinh(x: number): number {
    return Math.asinh(x);
  },
  atan(x: number): number {
    return Math.atan(x);
  },
  atan2(y: number, x: number): number {
    return Math.atan2(y, x);
  },
  atanh(x: number): number {
    return Math.atanh(x);
  },
};

export const constantProps = Object.getOwnPropertyNames(Math).filter((prop) => {
  const descriptor = Object.getOwnPropertyDescriptor(Math, prop);

  return (descriptor !== undefined && typeof descriptor.value === 'number');
});

const constantDescriptor: PropertyDescriptor = {
  configurable: false,
  enumerable: false,
  writable: false,
};

constantProps.forEach((prop) => {
  Object.defineProperty(MathPlus, prop, constantDescriptor);
});

export const methodProps = Object.getOwnPropertyNames(Math).filter((prop) => {
  const descriptor = Object.getOwnPropertyDescriptor(Math, prop);

  return (descriptor !== undefined && typeof descriptor.value === 'function');
});

const methodDescriptor: PropertyDescriptor = {
  enumerable: false,
};

methodProps.forEach((prop) => {
  Object.defineProperty(MathPlus, prop, methodDescriptor);
});

export default MathPlus;
