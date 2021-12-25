import { MathConstantName, MathMethodName } from './types';

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
};

export const constantProps: MathConstantName[] = [
  'E',
  'LN10',
  'LN2',
  'LOG10E',
  'LOG2E',
  'PI',
  'SQRT1_2',
  'SQRT2',
];

const constantDescriptor: PropertyDescriptor = {
  configurable: false,
  enumerable: false,
  writable: false,
};

constantProps.forEach((prop) => {
  Object.defineProperty(MathPlus, prop, constantDescriptor);
});

export const methodProps: MathMethodName[] = [
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'atan2',
  'ceil',
  'cbrt',
  'expm1',
  'clz32',
  'cos',
  'cosh',
  'exp',
  'floor',
  'fround',
  'hypot',
  'imul',
  'log',
  'log1p',
  'log2',
  'log10',
  'max',
  'min',
  'pow',
  'random',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tan',
  'tanh',
  'trunc',
];

export default MathPlus;
