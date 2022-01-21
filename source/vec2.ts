/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

/* spellchecker: disable */

import { vec2 as vec2_glm, ReadonlyVec2 } from 'gl-matrix';
export declare type vec2 = vec2_glm;

import { logArrayAsMatrix, matrixStringFromArray } from './matrixstring';

/* spellchecker: enable */


/**
 * A vec2 placeholder to overcome the gl-matrix out interface.
 */
export function v2(): vec2 {
    return vec2_glm.create();
}

module vec2_ext {

    /**
     * Creates a new two-component vector with random values.
     * ```
     * let a: vec2 = vec2.random(-1.0, +1.0);
     * ```
     * @param min - Lower bound for the random value range.
     * @param max - Upper bound for the random value range.
     * @returns - Vector with value randomized in [min, max].
     */
    export function random(min: number = 0.0, max: number = 1.0): vec2 {
        return Float32Array.from({ length: 2 }, () => (
            Math.random() * (max - min) + min)) as vec2;
    }

    /**
     * Constrain a two-component vector to lie between two further two-component vectors.
     * ```
     * let a: vec2 = vec2.fromValues(2, 2);
     * vec2.clamp(a, a, [0, 0], [1, 1]);
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to clamp.
     * @param min - Minimum vector operand.
     * @param max - Maximum vector operand.
     * @returns - Vector constrained to [min,max].
     */
    export function clamp(out: vec2, x: ReadonlyVec2 | number[], min: ReadonlyVec2 | number[], max: ReadonlyVec2 | number[]): vec2 {
        out[0] = Math.max(min[0], Math.min(max[0], x[0]));
        out[1] = Math.max(min[1], Math.min(max[1], x[1]));
        return out;
    }

    /**
     * Derive the absolute values of each of the two vector components.
     * ```
     * let a: vec2 = vec2.fromValues(-2, 2);
     * vec2.abs(a, a); // should result in [2,2]
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to apply abs to.
     * @returns - Vector with each component as absolute value.
     */
    export function abs(out: vec2, x: ReadonlyVec2): vec2 {
        out[0] = Math.abs(x[0]);
        out[1] = Math.abs(x[1]);
        return out;
    }

    /**
     * Parses a vec2 from a string.
     * @param v2str - String in the format '<number>, <number>', e.g., '1.0, 0.0'.
     * @returns - Vec2 if string was parsed successfully, undefined else.
     */
    export function parse(v2str: string | undefined): vec2 | undefined {
        if (v2str === undefined || v2str === '') {
            return undefined;
        }
        let numbers = [];
        try {
            numbers = JSON.parse(`[${v2str}]`);
        } catch (error) {
            return undefined;
        }
        return numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1]) ?
            undefined : vec2_glm.clone(numbers);
    }

    export function log(a: ReadonlyVec2, digits: number = 4): void {
        logArrayAsMatrix(a as Float32Array, 1, digits);
    }

    export function toMatrixString(a: ReadonlyVec2, digits: number = 4): string {
        return matrixStringFromArray(a as Float32Array, 1, digits);
    }

}

export const vec2 = {
    ...vec2_glm,
    ...vec2_ext
}
