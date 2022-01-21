/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

/* spellchecker: disable */

import { mat4 as mat4_glm, ReadonlyMat4 } from 'gl-matrix';
export declare type mat4 = mat4_glm;

import { logArrayAsMatrix, matrixStringFromArray } from './matrixstring';

/* spellchecker: enable */


/**
 * A mat4 placeholder to overcome the gl-matrix out interface.
 */
export function m4(): mat4 {
    return mat4_glm.create();
}

module mat4_ext {

    /**
     * Creates a new sixteen-component matrix with random values.
     * ```
     * let a: mat4 = mat4.random(-1.0, +1.0);
     * ```
     * @param min - Lower bound for the random value range.
     * @param max - Upper bound for the random value range.
     * @returns - Vector with value randomized in [min, max].
     */
    export function random(min: number = 0.0, max: number = 1.0): mat4 {
        return Float32Array.from({ length: 16 }, () => (
            Math.random() * (max - min) + min)) as mat4;
    }

    export function log(a: ReadonlyMat4, digits: number = 4): void {
        logArrayAsMatrix(a as Float32Array, 4, digits);
    }

    export function toMatrixString(a: ReadonlyMat4, digits: number = 4): string {
        return matrixStringFromArray(a as Float32Array, 4, digits);
    }

}

export const mat4 = {
    ...mat4_glm,
    ...mat4_ext
}
