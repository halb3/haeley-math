
/* spellchecker: disable */

import { expect } from 'chai';

import { RandomSquareKernel } from '../source/randomsquarekernel';

/* tslint:disable:no-unused-expression */

describe('RamdomSquare Kernel', () => {

    it('be initializable with values > 0', () => {
        expect(() => {
            let randomsquarekernel = new RandomSquareKernel(1);
            randomsquarekernel = new RandomSquareKernel(10);
            expect(randomsquarekernel).to.not.be.undefined;
        }).to.not.throw();
    });

    it('be not be initializable with values <= 0', () => {
        expect(() => {
            const randomsquarekernel = new RandomSquareKernel(0);
            expect(randomsquarekernel).to.be.undefined;
        }).to.throw();
    });

});
