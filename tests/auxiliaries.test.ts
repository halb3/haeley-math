
/* spellchecker: disable */

import { expect } from 'chai';

import {
    clamp, fract, mix, sign, rand, bitInBitfield, DEG2RAD, RAD2DEG, isPowerOfTwo, upperPowerOfTwo
} from '../source/auxiliaries';

/* spellchecker: enable */


describe('Auxiliaries', () => {

    it('should return the sign of a number as specified in GLSL', () => {
        expect(sign(-1.0)).to.equal(-1.0);
        expect(sign(-23.0)).to.equal(-1.0);

        expect(sign(0.0)).to.equal(0.0);

        expect(sign(+1.0)).to.equal(+1.0);
        expect(sign(+42.0)).to.equal(+1.0);
    });

    it('should clamp a number as specified in GLSL', () => {
        expect(clamp(+3, +0, +2)).to.equal(+2);
        expect(clamp(+1, +0, +2)).to.equal(+1);
        expect(clamp(-1, +0, +2)).to.equal(+0);

        expect(clamp(-3, -2, -0)).to.equal(-2);
        expect(clamp(-1, -2, -0)).to.equal(-1);
        expect(clamp(+1, -2, -0)).to.equal(-0);
    });

    it('should calculate the fraction of a positive or negative number', () => {
        expect(fract(+1.0)).to.equal(0.0);
        expect(fract(-1.0)).to.equal(0.0);

        expect(fract(0.0)).to.equal(0.0);

        expect(fract(+0.1)).to.closeTo(+0.1, 1e-8);
        expect(fract(+1.2)).to.closeTo(+0.2, 1e-8);
        expect(fract(-1.3)).to.closeTo(-0.3, 1e-8);
    });

    it('should mix two numbers as specified in GLSL', () => {
        expect(mix(+1.0, +2.0, 0.0)).to.closeTo(+1.0, 1e-8);
        expect(mix(+1.0, +2.0, 1.0)).to.closeTo(+2.0, 1e-8);
        expect(mix(+1.0, +2.0, 0.5)).to.closeTo(+1.5, 1e-8);
        expect(mix(+2.0, +1.0, 0.0)).to.closeTo(+2.0, 1e-8);
        expect(mix(-2.0, +2.0, 0.5)).to.closeTo(+0.0, 1e-8);
        expect(mix(-2.0, -4.0, 0.5)).to.closeTo(-3.0, 1e-8);
    });

});


describe('Auxiliaries rand', () => {

    it('should not exceed range within 1000 tests (fuzzy)', () => {
        for (let i = 0; i < 1000; ++i) {
            const value = rand(-i, +i);
            expect(value).to.be.at.least(-i);
            expect(value).to.be.at.most(+i);
        }
    });

    it('should return in range [0.0,1.0] by default (fuzzy)', () => {
        for (let i = 0; i < 1000; ++i) {
            const value = rand();
            expect(value).to.be.at.least(0.0);
            expect(value).to.be.at.most(1.0);
        }
    });

});


describe('Auxiliaries bitInBitfield', () => {

    it('should detect set/unset bits in bitfield', () => {
        expect(bitInBitfield(0, 0)).to.be.true;

        const bits = 1 << 1 | 1 << 4;

        expect(bitInBitfield(bits, 1 << 0)).to.be.false;
        expect(bitInBitfield(bits, 1 << 1)).to.be.true;
        expect(bitInBitfield(bits, 1 << 2)).to.be.false;
        expect(bitInBitfield(bits, 1 << 3)).to.be.false;
        expect(bitInBitfield(bits, 1 << 4)).to.be.true;
        expect(bitInBitfield(bits, 1 << 5)).to.be.false;
        expect(bitInBitfield(bits, 1 << 6)).to.be.false;
        expect(bitInBitfield(bits, 1 << 7)).to.be.false;

        expect(bitInBitfield(bits, bits)).to.be.true;
    });

    it('should return false for undefined flag', () => {
        expect(bitInBitfield(0, undefined)).to.be.false;
    });

});


describe('Auxiliaries RAD2DEG and DEG2RAD', () => {

    it('should be bijective', () => {
        expect(DEG2RAD * RAD2DEG).to.equal(1.0);
    });

    it('should convert degree to radian for sample set', () => {
        expect(DEG2RAD * 45.0).to.be.closeTo(Math.PI / 4, 1e-8);
        expect(DEG2RAD * 90.0).to.be.closeTo(Math.PI / 2, 1e-8);
        expect(DEG2RAD * 135.0).to.be.closeTo(3 * Math.PI / 4, 1e-8);
        expect(DEG2RAD * 180.0).to.be.closeTo(Math.PI, 1e-8);
        expect(DEG2RAD * 225.0).to.be.closeTo(5 * Math.PI / 4, 1e-8);
        expect(DEG2RAD * 270.0).to.be.closeTo(3 * Math.PI / 2, 1e-8);
        expect(DEG2RAD * 315.0).to.be.closeTo(7 * Math.PI / 4, 1e-8);
        expect(DEG2RAD * 360.0).to.be.closeTo(2 * Math.PI, 1e-8);
    });

    it('should convert radian to degree for sample set', () => {
        expect(RAD2DEG * Math.PI / 4).to.be.closeTo(45.0, 1e-8);
        expect(RAD2DEG * Math.PI / 2).to.be.closeTo(90.0, 1e-8);
        expect(RAD2DEG * 3 * Math.PI / 4).to.be.closeTo(135.0, 1e-8);
        expect(RAD2DEG * Math.PI).to.be.closeTo(180.0, 1e-8);
        expect(RAD2DEG * 5 * Math.PI / 4).to.be.closeTo(225.0, 1e-8);
        expect(RAD2DEG * 3 * Math.PI / 2).to.be.closeTo(270.0, 1e-8);
        expect(RAD2DEG * 7 * Math.PI / 4).to.be.closeTo(315.0, 1e-8);
        expect(RAD2DEG * 2 * Math.PI).to.be.closeTo(360.0, 1e-8);
    });

});


describe('Auxiliaries power-of-two', () => {

    it('should return detect if number is power of two', () => {

        expect(isPowerOfTwo(0)).to.be.false;
        for (let i = 0; i < 31; ++i) {
            expect(isPowerOfTwo(1 << i)).to.be.true;
        }

        expect(isPowerOfTwo(3)).to.be.false;
        expect(isPowerOfTwo(5)).to.be.false;
        expect(isPowerOfTwo(7)).to.be.false;
        expect(isPowerOfTwo(15)).to.be.false;

        expect(isPowerOfTwo(1 << 31)).to.be.false;
        expect(isPowerOfTwo((1 << 30) - 1)).to.be.false;

        expect(isPowerOfTwo(-1)).to.be.false;
        expect(isPowerOfTwo(-2)).to.be.false;
        expect(isPowerOfTwo(-3)).to.be.false;
    });

    it('should return upper power of two for a given number', () => {

        expect(upperPowerOfTwo(-2)).to.equal(0);
        expect(upperPowerOfTwo(-1)).to.equal(0);

        expect(upperPowerOfTwo(0)).to.equal(0);
        expect(upperPowerOfTwo(1)).to.equal(1);
        expect(upperPowerOfTwo(2)).to.equal(2);
        expect(upperPowerOfTwo(3)).to.equal(4);
        expect(upperPowerOfTwo(4)).to.equal(4);
        expect(upperPowerOfTwo(5)).to.equal(8);

        expect(upperPowerOfTwo(192)).to.equal(256);
        expect(upperPowerOfTwo(768)).to.equal(1024);

        expect(upperPowerOfTwo(768)).to.equal(1024);
        expect(upperPowerOfTwo(708405415)).to.equal(1 << 30);
    });

});
