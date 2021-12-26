
/* spellchecker: disable */

import { RandomSquareKernel } from './randomsquarekernel';

import GoldenSet8 from './goldenset8.json';
import GoldenSet64 from './goldenset64.json';
import GoldenSet128 from './goldenset128.json';

/* spellchecker: enable */


/**
 * An anti-aliasing kernel which provides NDC offsets for anti-aliasing, e.g., when using multi-frame sampling.
 */
export class AntiAliasingKernel extends RandomSquareKernel {

    /**
     * AntiAliasingKernel is fixed to one-dimension (x-axis) and 2-components per sample.
     * @param width - Width of the kernel along its x-axis.
     */
    constructor(width: GLsizei) {
        super(width);
    }

    /**
     * Invokes regeneration of all values. If width is either 8 or 64 pre-built kernels will be loaded (golden set). In
     * any other case, a random square kernel will be created.
     */
    protected generate(): void {
        switch (this._width) {
            case 8:
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.fromJSON(GoldenSet8);
                break;

            case 64:
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.fromJSON(GoldenSet64);
                break;

            case 128:
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.fromJSON(GoldenSet128);
                break;

            default:
                super.generate();
        }
    }

}
