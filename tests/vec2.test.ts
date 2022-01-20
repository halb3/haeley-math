
/* spellchecker: disable */

import { expect } from 'chai';

import { vec2, v2 } from '../source/vec2';

/* spellchecker: enable */


describe('gl-matrix vec2 extensions clamp', () => {

    it('should clamp a vec2 as specified in GLSL', () => {
        let a: vec2 = vec2.fromValues(2, 2);
        const b: vec2 = vec2.create();
        a = vec2.clamp(b, a, vec2.fromValues(0, 0), vec2.fromValues(1, 1));
        expect(vec2.equals(a, b)).to.be.true;
        expect(vec2.equals(a, vec2.fromValues(1, 1))).to.be.true;

        a[0] = 3;
        a[1] = 4;
        vec2.clamp(b, a, vec2.fromValues(1, 2), vec2.fromValues(2, 3));
        expect(vec2.equals(b, vec2.fromValues(2, 3))).to.be.true;
    });

});


describe('gl-matrix vec2 extensions abs', () => {

    it('should return the absolute of a vec2 as specified in GLSL', () => {
        const a: vec2 = vec2.fromValues(-2, 2);
        vec2.abs(a, a);
        expect(a[0]).to.equal(2);
        expect(a[1]).to.equal(2);
    });

});


describe('gl-matrix vec2 extensions', () => {

    it('should provide tinified empty vec2 constructors', () => {
        expect(vec2.equals(v2(), vec2.fromValues(0, 0))).to.be.true;
    });

    it('should parse vec2 from string', () => {
        expect(vec2.parse(undefined)).to.be.undefined;
        expect(vec2.parse('')).to.be.undefined;
        expect(vec2.parse('[')).to.be.undefined;

        expect(vec2.parse('[0.0, 0.0]')).to.be.undefined;

        expect(vec2.parse('0.0')).to.be.undefined;
        expect(vec2.parse('0.0, 0.0, 0.0')).to.be.undefined;

        expect(vec2.equals(vec2.parse('0.0, 0.0')!, v2())).to.be.true;
        expect(vec2.equals(vec2.parse('2.0, 4.0')!, vec2.fromValues(2.0, 4.0))).to.be.true;
    });

    it('should provide default initialized vec and mat abbreviations', () => {
        expect(vec2.equals(vec2.create(), v2())).to.be.true;
    });

});
