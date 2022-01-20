/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

/* spellchecker: disable */

import { mat3 as mat3_glm, ReadonlyMat3 } from 'gl-matrix';
export declare type mat3 = mat3_glm;

import { logArrayAsMatrix } from './matrixstring';

/* spellchecker: enable */


/**
 * A mat3 placeholder to overcome the gl-matrix out interface.
 */
export function m3(): mat3 {
    return mat3_glm.create();
}

module mat3_ext {

    /**
     * Creates a new nine-component matrix with random values.
     * ```
     * let a: mat3 = mat3.random(-1.0, +1.0);
     * ```
     * @param min - Lower bound for the random value range.
     * @param max - Upper bound for the random value range.
     * @returns - Vector with value randomized in [min, max].
     */
    export function random(min: number = 0.0, max: number = 1.0): mat3 {
        return Float32Array.from({ length: 9 }, () => (
            Math.random() * (max - min) + min)) as mat3;
    }

    export function log(a: ReadonlyMat3, digits: number = 4): void {
        logArrayAsMatrix(a as Float32Array, 3, digits);
    }

}

export const mat3 = {
    ...mat3_glm,
    ...mat3_ext
}
