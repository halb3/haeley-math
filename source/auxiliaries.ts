
/* spellchecker: disable */

/* spellchecker: enable */

// GLSL sign https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/sign.xhtml

/**
 * Extract the sign of the parameter as specified in GLSL.
 * @param x - Value from which to extract the sign.
 * @returns - -1.0 if x is less than 0.0, 0.0 if x is equal to 0.0, and +1.0 if x is greater than 0.0.
 */
export function sign(x: number): number {
  return x > 0.0 ? 1.0 : x < 0.0 ? -1.0 : 0.0;
}

// GLSL clamp https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/clamp.xhtml

/**
* Constrain a value to lie between two further values.
* ```
* clamp(+3, +0, +2); // results in +2;
* ```
* @param x - The number to clamp.
* @param min - Minimum number operand.
* @param max - Maximum number operand.
* @returns - Number constrained to [min,max].
*/
export function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

/**
* Compute the fractional part of the argument.
* ```
* fract(+1.23); // results in +0.23
* fract(-1.23); // results in -0.23
* ```
* @param x - The number to compute the fractional part of.
* @returns - The fractional part of x. This is calculated as x - floor(x).
*/
export function fract(x: number): number {
  return x > 0 ? x - Math.floor(x) : x - Math.ceil(x);
}

/**
 * Performs a mix as specified in GLSL.
 * @param value1 - The first value.
 * @param value2 - The second value.
 * @param interpolation - The interpolation value (usually between 0 and 1).
 * @returns - The interpolated value between value1 and value2.
 */
export function mix(value1: number, value2: number, interpolation: number): number {
  return value1 * (1.0 - interpolation) + value2 * interpolation;
}

/**
 * Generates a random value within a given range [min,max].
 * @param min - Minimum random value possible.
 * @param max - Maximum random value possible.
 * @returns - Random number in the range [min,max].
 */
export function rand(min: number = 0.0, max: number = 1.0): number {
  return Math.random() * (max - min) + min;
}

/**
* Tests with binary operations if the number is power of two.
* @param x The number to test.
*/
export function isPowerOfTwo(x: number): boolean {
  return Number.isInteger(x) && Number.isInteger(Math.log2(x));
}

/**
* Computes the next upper power of two for the given number. Math is based on
* {@link https://graphics.stanford.edu/~seander/bithacks.html}.
* @param x - Number to compute next upper power of two for.
*/
export function upperPowerOfTwo(x: number): number {
  --x;
  x |= x >> 1;
  x |= x >> 2;
  x |= x >> 4;
  x |= x >> 8;
  x |= x >> 16;
  return ++x;
}

/**
 * Tests if specific bits are set in a given bitfield and returns true if so, false otherwise.
 */
export function bitInBitfield(flags: GLbitfield, flag: GLbitfield | undefined): boolean {
  if (flag === undefined) {
    return false;
  }
  return (flags & flag) === flag;
}

/**
* Conversion multiplier for radians to degrees conversion (180 / PI).
*/
export const RAD2DEG = 57.29577951308232;

/**
* Conversion multiplier for degrees to radians conversion (PI / 180).
*/
export const DEG2RAD = 0.017453292519943295;
