
/* spellchecker: disable */

/* spellchecker: enable */

export function factorize(x: GLint): GLfloat {
    const xi = Math.floor(x);
    return xi == 0 ? 1 : xi * factorize(xi - 1);
}

/**
 * Computation of the gauss-error (which gives the accumulated area below the normal
 * distribution) using its Maclaurin series (https://en.wikipedia.org/wiki/Error_function)
 * @param z - Value to compute the error function for.
 * @param n - Number of steps used in the Maclaurin series.
 * @returns
 */
export function erf(z: GLfloat, n: GLint): GLfloat {
    const lower = (n: GLint) => factorize(n) * (2.0 * n + 1.0);
    const upper = (n: GLint, z: GLfloat) => Math.pow(-1, n) * Math.pow(z, 2.0 * n + 1.0);

    const ni = Math.floor(n);
    let sum = 0.0;
    for (let i = 0; i <= ni; ++i) {
        sum += upper(i, z) / lower(i);
    }
    // area of normal distribution is sqrt(PI) and erf is single-sided
    return sum * 2.0 / Math.sqrt(Math.PI);
}

/**
 * Compute the area of the gauss error (erf) within a given range, based on buckets.
 * The classical sigma is expected to be 1.0 / (sigma * Math.pow(2.0)) ...
 * @todo The sigma here is not the actual sigma of the normal distribution - this should be fixed.
 * @param i - Bucket index in [0, k]. The 0 denotes the x=0/central bucket.
 * @param k - Number of buckets (half-sided), e.g., 1 for a 3-kernel, or 2 for a 5-kernel...
 * @param sigma - Some sigma to scale kernel size into, defaulted empirically by trying to get a rest area of < 0.0001
 * @returns
 */
export function erfBucketArea(i: GLint, k: GLint, sigma: GLfloat = 2.75106392): GLfloat {

    // Calculate the total number of buckets
    const ktotal = 2.0 * k + 1;

    // Start and end position of ith bucket
    const x0 = (i < 1 ? 0.0 : (-1.0 + 2.0 * i) / ktotal * sigma);
    const x1 = (+1.0 + 2.0 * i) / ktotal * sigma;

    const steps = 32; // Number of steps used in the Maclaurin series.
    // areas for both positions
    const p0 = erf(x0, steps);
    const p1 = erf(x1, steps);

    // difference is area within bucket, note that all except the first buckets are applied twice
    return (p1 - p0) * (i < 1 ? 1.0 : 0.5);
}

/**
 * Calculates a half-sided kernel using the gauss error function.
 * The classical sigma is expected to be 1.0 / (sigma * Math.pow(2.0)) ...
 * @todo The sigma here is not the actual sigma of the normal distribution - this should be fixed.
 * @param k - Number of buckets (half-sided), e.g., 1 for a 3-kernel, or 2 for a 5-kernel...
 * @param sigma - Some sigma to scale kernel size into, defaulted empirically by trying to get a rest area of < 0.0001
 * @returns
 */
export function erfKernel(k: GLint, sigma: GLfloat = 2.75106392): Float32Array {

    // Calculates a half-sided kernel using the gauss error function.
    const size = Math.max(0, k);
    const weights = new Float32Array(size + 1);

    let sum = 0.0; // check sum for remaining area computation

    for (let i = 0; i <= size; ++i) {
        weights[i] = erfBucketArea(i, size, sigma);
        sum += weights[i] * (i > 0 ? 2.0 : 1.0);
    }

    // account for the remaining area (should be approximately the
    // single-sided error of 0.0001 tweaked towards above ...)
    weights[size] += (1.0 - sum) * (size > 0 ? 0.5 : 1.0);

    return weights;
}
