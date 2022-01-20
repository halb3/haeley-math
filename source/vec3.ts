/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

/* spellchecker: disable */

import { vec3 as vec3_glm, ReadonlyVec3, ReadonlyVec4 } from 'gl-matrix';
export declare type vec3 = vec3_glm;

import { fract } from './auxiliaries';
import { logArrayAsMatrix } from './matrixstring';

/* spellchecker: enable */


/**
 * A vec3 placeholder to overcome the gl-matrix out interface.
 */
export function v3(): vec3 {
    return vec3_glm.create();
}

module vec3_ext {

    /**
     * Creates a new three-component vector with random values.
     * ```
     * let a: vec3 = vec3.random(-1.0, +1.0);
     * ```
     * @param min - Lower bound for the random value range.
     * @param max - Upper bound for the random value range.
     * @returns - Vector with value randomized in [min, max].
     */
    export function random(min: number = 0.0, max: number = 1.0): vec3 {
        return Float32Array.from({ length: 3 }, () => (
            Math.random() * (max - min) + min)) as vec3;
    }

    /**
     * Constrain a three-component vector to lie between two further three-component vectors.
     * ```
     * let a: vec3 = vec3.fromValues(2, 2, 2);
     * vec3.clamp(a, a, [0, 0, 0], [1, 1, 1]);
     * ```
     * @param out -The receiving vector.
     * @param x - The vector to clamp.
     * @param min - Minimum vector operand.
     * @param max - Maximum vector operand.
     * @returns - Vector constrained to [min,max].
     */
    export function clamp(out: vec3, x: ReadonlyVec3 | number[], min: ReadonlyVec3 | number[], max: ReadonlyVec3 | number[]): vec3 {
        out[0] = Math.max(min[0], Math.min(max[0], x[0]));
        out[1] = Math.max(min[1], Math.min(max[1], x[1]));
        out[2] = Math.max(min[2], Math.min(max[2], x[2]));
        return out;
    }

    /**
     * Derive the absolute values of each of the three vector components.
     * ```
     * let a: vec3 = vec3.fromValues(-2, 2, -1);
     * vec3.abs(a, a); // should result in [2,2,1]
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to apply abs to.
     * @returns  - Vector with each component as absolute value.
     */
    export function abs(out: vec3, x: ReadonlyVec3): vec3 {
        out[0] = Math.abs(x[0]);
        out[1] = Math.abs(x[1]);
        out[2] = Math.abs(x[2]);
        return out;
    }

    /**
     * Parses a vec3 from a string.
     * @param v3str - String in the format '<number>, <number>, <number>', e.g., '1.0, 0.0, 1.0'.
     * @returns - Vec3 if string was parsed successfully, undefined else.
     */
    export function parse(v3str: string | undefined): vec3 | undefined {
        if (v3str === undefined || v3str === '') {
            return undefined;
        }
        let numbers = [];
        try {
            numbers = JSON.parse(`[${v3str}]`);
        } catch (error) {
            return undefined;
        }
        return numbers.length !== 3 || isNaN(numbers[0]) || isNaN(numbers[1]) || isNaN(numbers[2]) ?
            undefined : vec3_glm.clone(numbers);
    }

    export function log(a: ReadonlyVec3, digits: number = 4): void {
        logArrayAsMatrix(a as Float32Array, 1, digits);
    }

    /**
     * Constructs a vec3 from a vec4 with division by the w component applied. If the w component is zero, division
     * skipped.
     * ```
     * const v4: vec4 = vec4.fromValues(2, 4, 6, 2);
     * const v3: vec3 = fromVec4(v4); // v3 is [1, 2, 3]
     * ```
     * @param x - The vector to be transformed to a vec3.
     * @returns - Three component vector based on x.
     */
    export function fromVec4(x: ReadonlyVec4): vec3 {
        if (x[3] === 0) {
            return vec3_glm.fromValues(x[0], x[1], x[2]);
        }
        return vec3_glm.fromValues(x[0] / x[3], x[1] / x[3], x[2] / x[3]);
    }


    const one256ths: number = 1.0 / 256.0;

    /**
     * Encodes a 24bit floating point in [0,1] into three 8bit components (vec3 of uint8).
     * @param out - The vector to encode into.
     * @param x - 24bit floating point number to encode.
     * @returns - Vector with the float encoded.
     */
    export function encode_float24x1_to_uint8x3(out: vec3, x: number): vec3 {
        out[0] = Math.floor(x * 256.0);
        out[1] = Math.floor(fract(x * 256.0) * 256.0);
        out[2] = Math.floor(fract(x * 65536.0) * 256.0);
        return out;
    }

    /**
     * Decodes three 8bit components of a vec3 to a 24bit floating point number.
     * @param x - Vector with three 8bit unsigned int components (uint8x3).
     * @returns - Encoded 24bit floating point number.
     */
    export function decode_float24x1_from_uint8x3(x: ReadonlyVec3): number {
        return (x[0] + (x[1] + x[2] * one256ths) * one256ths) * one256ths;
    }

    /**
     * Packs a 24bit unsigned int into a three component byte vector.
     * ```
     * let uint8x3: vec3 = vec3.create();
     * vec3.encode_uint24_in_rgb8(uint8x3, 250285); // should result in [ 173, 209, 3 ]
     * ```
     * @param out - byte (uint8) vector with packed uint24 data
     * @param x - uint24 number
     * @returns - Three component byte vector with x packed.
     */
    export function encode_uint24_to_rgb8(out: vec3, x: number): vec3 {
        out[0] = (x >>> 0) & 0xFF;
        out[1] = (x >>> 8) & 0xFF;
        out[2] = (x >>> 16) & 0xFF;
        return out;
    }

    /**
     * Unpacks a 24bit unsigned int from a three component byte vector.
     * ```
     * let uint8x3: vec3 = vec3.fromValues(173, 209, 3);
     * vec3.decode_uint24_from_rgb8(uint8x3); // should return 250285
     * ```
     * @param x - byte (uint8) vector with packed uint24 data
     * @returns - Unpacked 24bit unsigned int.
     */
    export function decode_uint24_from_rgb8(x: ReadonlyVec3): number {
        return x[0] + (x[1] << 8) + (x[2] << 16);
    }

}

export const vec3 = {
    ...vec3_glm,
    ...vec3_ext
}
