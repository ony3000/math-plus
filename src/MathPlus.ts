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
  cbrt(x: number): number {
    return Math.cbrt(x);
  },
  ceil(x: number): number {
    return Math.ceil(x);
  },
  clz32(x: number): number {
    return Math.clz32(x);
  },
  cos(x: number): number {
    return Math.cos(x);
  },
  cosh(x: number): number {
    return Math.cosh(x);
  },
  exp(x: number): number {
    return Math.exp(x);
  },
  expm1(x: number): number {
    return Math.expm1(x);
  },
  floor(x: number): number {
    return Math.floor(x);
  },
  fround(x: number): number {
    return Math.fround(x);
  },
  hypot(...values: number[]): number {
    return Math.hypot(...values);
  },
  imul(x: number, y: number): number {
    return Math.imul(x, y);
  },
  log(x: number): number {
    return Math.log(x);
  },
  log10(x: number): number {
    return Math.log10(x);
  },
  log1p(x: number): number {
    return Math.log1p(x);
  },
  log2(x: number): number {
    return Math.log2(x);
  },
  max(...values: number[]): number {
    return Math.max(...values);
  },
  min(...values: number[]): number {
    return Math.min(...values);
  },
  pow(x: number, y: number): number {
    return Math.pow(x, y);
  },
  random(): number {
    return Math.random();
  },
  round(x: number): number {
    return Math.round(x);
  },
  sign(x: number): number {
    return Math.sign(x);
  },
  sin(x: number): number {
    return Math.sin(x);
  },
  sinh(x: number): number {
    return Math.sinh(x);
  },
  sqrt(x: number): number {
    return Math.sqrt(x);
  },
  tan(x: number): number {
    return Math.tan(x);
  },
  tanh(x: number): number {
    return Math.tanh(x);
  },
  trunc(x: number): number {
    return Math.trunc(x);
  },
  [Symbol.toStringTag]: 'MathPlus',
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

Object.defineProperty(MathPlus, Symbol.toStringTag, {
  configurable: true,
  enumerable: false,
  writable: false,
});

export default MathPlus;
