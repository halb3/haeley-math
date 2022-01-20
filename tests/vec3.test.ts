
/* spellchecker: disable */

import { expect } from 'chai';

import { vec3, v3 } from '../source/vec3';
import { vec4 } from '../source/vec4';

/* spellchecker: enable */


describe('gl-matrix vec2 extensions clamp', () => {

    it('should clamp a vec3 as specified in GLSL', () => {
        let a: vec3 = vec3.fromValues(2, 2, 2);
        const b: vec3 = vec3.create();
        a = vec3.clamp(b, a, vec3.fromValues(0, 0, 0), vec3.fromValues(1, 1, 1));
        expect(vec3.equals(a, b)).to.be.true;
        expect(vec3.equals(b, vec3.fromValues(1, 1, 1))).to.be.true;

        a[0] = 3;
        a[1] = 4;
        a[2] = 5;
        vec3.clamp(b, a, vec3.fromValues(1, 2, 3), vec3.fromValues(2, 3, 4));
        expect(vec3.equals(b, vec3.fromValues(2, 3, 4))).to.be.true;
    });

});


describe('gl-matrix vec3 extensions abs', () => {

    it('should return the absolute of a vec3 as specified in GLSL', () => {
        const a: vec3 = vec3.fromValues(-2, 2, -1);
        vec3.abs(a, a);
        expect(a[0]).to.equal(2);
        expect(a[1]).to.equal(2);
        expect(a[2]).to.equal(1);
    });

});


describe('gl-matrix vec3 extensions', () => {

    it('should derive a vec3 from vec4 with division by w component', () => {
        const v4: vec4 = vec4.fromValues(2, 4, 6, 2);
        const v3: vec3 = vec3.fromVec4(v4);
        expect(vec3.equals(v3, vec3.fromValues(1, 2, 3))).to.be.true;
    });

    it('should derive a vec3 from vec4 without division by w component if w = 0', () => {
        const v4: vec4 = vec4.fromValues(2, 4, 6, 0);
        const v3: vec3 = vec3.fromVec4(v4);
        expect(vec3.equals(v3, vec3.fromValues(2, 4, 6))).to.be.true;
    });

    it('should provide tinified empty vec3 constructors', () => {
        expect(vec3.equals(v3(), vec3.fromValues(0, 0, 0))).to.be.true;
    });

    it('should parse vec3 from string', () => {
        expect(vec3.parse(undefined)).to.be.undefined;
        expect(vec3.parse('')).to.be.undefined;
        expect(vec3.parse('[')).to.be.undefined;

        expect(vec3.parse('[0.0, 0.0, 0.0]')).to.be.undefined;

        expect(vec3.parse('0.0')).to.be.undefined;
        expect(vec3.parse('0.0, 0.0')).to.be.undefined;
        expect(vec3.parse('0.0, 0.0, 0.0, 0.0')).to.be.undefined;

        expect(vec3.equals(vec3.parse('0.0, 0.0, 0.0')!, v3())).to.be.true;
        expect(vec3.equals(vec3.parse('2.0, 4.0, 8.0')!, vec3.fromValues(2.0, 4.0, 8.0))).to.be.true;
    });


    it('should provide default initialized vec and mat abbreviations', () => {
        expect(vec3.equals(vec3.create(), v3())).to.be.true;
    });

});


describe('gl-matrix vec3 extensions (un)packing', () => {

    it('should pack a uint24 into a uint8x3', () => {
        const uint24 = 250285; // 3D1AD > AD, D1, 03
        const uint8x3: vec3 = vec3.create();
        vec3.encode_uint24_to_rgb8(uint8x3, uint24);
        expect(vec3.equals(uint8x3, vec3.fromValues(0xAD, 0xD1, 0x03))).to.be.true;
    });

    it('should unpack a uint24 from a uint8x3', () => {
        const uint8x3: vec3 = vec3.fromValues(0xAD, 0xD1, 0x03);
        const uint24: number = vec3.decode_uint24_from_rgb8(uint8x3);
        expect(uint24).to.equal(250285);
    });

    it('should pack a float24 into a uint8x3', () => {
        const float24 = 0.12345678;
        const uint8x3: vec3 = vec3.create();
        vec3.encode_float24x1_to_uint8x3(uint8x3, float24);
        expect(vec3.equals(uint8x3, vec3.fromValues(0x1F, 0x9A, 0xDD))).to.be.true;
    });

    it('should unpack a float24 from uint8x3', () => {
        const uint8x3: vec3 = vec3.fromValues(0x1F, 0x9A, 0xDD);
        const float24 = vec3.decode_float24x1_from_uint8x3(uint8x3);
        expect(float24).to.be.closeTo(0.12345678, 1e-8);
    });

});

