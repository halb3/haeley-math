
/* spellchecker: disable */

import { KernelF32 } from './kernel';
import { erfKernel } from './gaussianerror';

/* spellchecker: enable */


/**
 * A one-component kernel with a gaussian distribution.
 */
export class GaussianKernel extends KernelF32 {

    /**
     * GaussianKernel works for up to three dimensions and single components per sample.
     * Note: for now only odd-sized kernels are supported, with their size being indicated by (i * 2 + 1).
     * Example:
     * ```
     *
     * ```
     * @param width - Half width of the kernel along its x-axis.
     * @param height - Half height of the kernel along its y-axis.
     * @param depth - Half depth of the kernel along its z-axis.
     */
    constructor(width: GLsizei, height: GLsizei = 1, depth: GLsizei = 1) {
        super(1, width * 2 + 1, height * 2 + 1, depth * 2 + 1);
        this.generate();
    }

    /**
     * Invokes regeneration of all values.
     */
    protected generate(): void {

        const kw = Math.floor(this._width / 2);
        const kh = Math.floor(this._height / 2);
        const kd = Math.floor(this._depth / 2);

        // Create a normalized, half-sided kernel per kernel extent.
        const wKernel = kw === 0 ? new Float32Array([1.0]) : erfKernel(kw);
        const hKernel = kh === 0 ? new Float32Array([1.0]) : erfKernel(kh);
        const dKernel = kd === 0 ? new Float32Array([1.0]) : erfKernel(kd);

        console.log('w', kw, wKernel);
        console.log('h', kh, hKernel);
        console.log('d', kd, dKernel);


        for (let z = 0; z < this._depth; ++z)
            for (let y = 0; y < this.height; ++y)
                for (let x = 0; x < this._width; ++x) {

                    const weight = wKernel[Math.abs(kw - x)]
                        * hKernel[Math.abs(kh - y)] * dKernel[Math.abs(kd - z)];

                    const i = this.index(x, y, z);
                    this._samples[i] = weight;
                }
    }
}
