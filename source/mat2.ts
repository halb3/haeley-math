/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

/* spellchecker: disable */

import { mat2 as mat2_glm, ReadonlyMat2, ReadonlyMat2d } from 'gl-matrix';
export declare type mat2 = mat2_glm;

import { logArrayAsMatrix, matrixStringFromArray } from './matrixstring';

/* spellchecker: enable */


/**
 * A mat2 placeholder to overcome the gl-matrix out interface.
 */
export function m2(): mat2 {
    return mat2_glm.create();
}

module mat2_ext {

    /**
     * Creates a new four-component matrix with random values.
     * ```
     * let a: mat2 = mat2.random(-1.0, +1.0);
     * ```
     * @param min - Lower bound for the random value range.
     * @param max - Upper bound for the random value range.
     * @returns - Vector with value randomized in [min, max].
     */
    export function random(min: number = 0.0, max: number = 1.0): mat2 {
        return Float32Array.from({ length: 4 }, () => (
            Math.random() * (max - min) + min)) as mat2;
    }

    export function log(a: ReadonlyMat2, digits: number = 4): void {
        logArrayAsMatrix(a as Float32Array, 2, digits);
    }

    export function toMatrixString(a: ReadonlyMat2, digits: number = 4): string {
        return matrixStringFromArray(a as Float32Array, 2, digits);
    }

}

export const mat2 = {
    ...mat2_glm,
    ...mat2_ext
}
