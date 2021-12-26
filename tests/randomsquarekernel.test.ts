
/* spellchecker: disable */

import { assertions } from 'haeley-auxiliaries';
assertions(true);

import { expect } from 'chai';

import { RandomSquareKernel } from '../source/randomsquarekernel';

/* tslint:disable:no-unused-expression */

describe('RamdomSquareKernel', () => {
    it('be initializable with values > 0', () => {
        expect(() => {
            let randomsquarekernel = new RandomSquareKernel(1);
            randomsquarekernel = new RandomSquareKernel(10);
            expect(randomsquarekernel).to.not.be.undefined;
        }).to.not.throws();
    });

    it('be not be initializable with values <= 0', () => {
        expect(() => {
            const randomsquarekernel = new RandomSquareKernel(0);
            expect(randomsquarekernel).to.be.undefined;
        }).to.throws();
    });
});
