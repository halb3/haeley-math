/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

/* spellchecker: disable */

import { vec4 as vec4_glm, ReadonlyVec4, ReadonlyVec3 } from 'gl-matrix';
export declare type vec4 = vec4_glm;

import { logArrayAsMatrix } from './matrixstring';

/* spellchecker: enable */


/**
 * A vec4 placeholder to overcome the gl-matrix out interface.
 */
export function v4(): vec4_glm {
    return vec4_glm.create();
}

module vec4_ext {

    /**
     * Creates a new four-component vector with random values.
     * ```
     * let a: vec4 = vec4.random(-1.0, +1.0);
     * ```
     * @param min - Lower bound for the random value range.
     * @param max - Upper bound for the random value range.
     * @returns - Vector with value randomized in [min, max].
     */
    export function random(min: number = 0.0, max: number = 1.0): vec4 {
        return Float32Array.from({ length: 4 }, () => (
            Math.random() * (max - min) + min)) as vec4;
    }

    /**
     * Constrain a four-component vector to lie between two further four-component vectors.
     * ```
     * let a: vec4 = vec4.fromValues(2, 2, 2, 2);
     * vec4.clamp(a, a, [0, 0, 0, 0], [1, 1, 1, 1]);
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to clamp.
     * @param min - Minimum vector operand.
     * @param max - Maximum vector operand.
     * @returns - Vector constrained to [min,max].
     */
    export function clamp(out: vec4, x: ReadonlyVec4 | number[], min: ReadonlyVec4 | number[], max: ReadonlyVec4 | number[]): vec4 {
        out[0] = Math.max(min[0], Math.min(max[0], x[0]));
        out[1] = Math.max(min[1], Math.min(max[1], x[1]));
        out[2] = Math.max(min[2], Math.min(max[2], x[2]));
        out[3] = Math.max(min[3], Math.min(max[3], x[3]));
        return out;
    }

    /**
     * Derive the absolute values of each of the four vector components.
     * ```
     * let a: vec4 = vec4.fromValues(-2, 2, -1, 1);
     * vec4.abs(a, a); // should result in [2,2,1,1]
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to apply abs to.
     * @returns - Vector with each component as absolute value.
     */
    export function abs(out: vec4, x: ReadonlyVec4): vec4 {
        out[0] = Math.abs(x[0]);
        out[1] = Math.abs(x[1]);
        out[2] = Math.abs(x[2]);
        out[3] = Math.abs(x[3]);
        return out;
    }

    /**
     * Parses a vec4 from a string.
     * @param v4str - String in the format '<number>, <number>, <number>, <number>', e.g., '1.0, 0.0, 0.0, 0.0'.
     * @returns - Vec4 if string was parsed successfully, undefined else.
     */
    export function parse(v4str: string | undefined): vec4 | undefined {
        if (v4str === undefined || v4str === '') {
            return undefined;
        }
        let numbers = [];
        try {
            numbers = JSON.parse(`[${v4str}]`);
        } catch (error) {
            return undefined;
        }
        return numbers.length !== 4 || isNaN(numbers[0]) || isNaN(numbers[1]) ||
            isNaN(numbers[2]) || isNaN(numbers[3]) ?
            undefined : vec4_glm.clone(numbers);
    }

    export function log(a: ReadonlyVec4, digits: number = 4): void {
        logArrayAsMatrix(a as Float32Array, 1, digits);
    }

    /**
     * Constructs a vec4 from a vec3 by appending 1.0 as the w component.
     * ```
     * const v3: vec3 = vec3.fromValues(2, 4, 6);
     * const v4: vec4 = fromVec3(v3); // v3 is [2, 4, 6, 1]
     * ```
     * @param x - The vector to be transformed to a vec4.
     * @returns - Four component vector based on x.
     */
    export function fromVec3(x: ReadonlyVec3): vec4 {
        return vec4_glm.fromValues(x[0], x[1], x[2], 1.0);
    }

    /**
     * Packs a 32bit unsigned int into a four component byte vector.
     * ```
     * let uint8x4: vec4 = vec4.create();
     * vec4.encode_uint24_in_rgb8(uint8x4, 250285); // should result in [ 173, 209, 3, 0 ]
     * ```
     * @param out - byte (uint8) vector with packed uint32 data
     * @param x - uint32 number
     * @returns - Three component byte vector with x packed.
     */
    export function encode_uint32_to_rgba8(out: vec4, x: number): vec4 {
        out[0] = (x >>> 0) & 0xFF;
        out[1] = (x >>> 8) & 0xFF;
        out[2] = (x >>> 16) & 0xFF;
        out[3] = (x >>> 24) & 0xFF;

        return out;
    }

    /**
     * Unpacks a 32bit unsigned int from a four component byte vector.
     * ```
     * let uint8x4: vec4 = vec4.fromValues(173, 209, 3, 23);
     * vec4.decode_uint24_from_rgba8(uint8x4); // should return xxx
     * ```
     * @param x - byte (uint8) vector with packed uint32 data
     * @returns - Unpacked 32bit unsigned int.
     */
    export function decode_uint32_from_rgba8(x: ReadonlyVec4): number {
        return x[0] + (x[1] << 8) + (x[2] << 16) + (x[3] << 24) >>> 0;
    }
}

export const vec4 = {
    ...vec4_glm,
    ...vec4_ext
}
