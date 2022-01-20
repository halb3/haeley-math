
/* spellchecker: disable */

import { expect } from 'chai';

import { vec4, v4 } from '../source/vec4';
import { vec3 } from '../source/vec3';


/* spellchecker: enable */


describe('gl-matrix vec4 extensions clamp', () => {

    it('should clamp a vec4 as specified in GLSL', () => {
        let a: vec4 = vec4.fromValues(2, 2, 2, 2);
        const b: vec4 = vec4.create();
        a = vec4.clamp(b, a, vec4.fromValues(0, 0, 0, 0), vec4.fromValues(1, 1, 1, 1));
        expect(vec4.equals(a, b)).to.be.true;
        expect(vec4.equals(b, vec4.fromValues(1, 1, 1, 1))).to.be.true;

        a[0] = 3;
        a[1] = 4;
        a[2] = 5;
        a[3] = 6;
        vec4.clamp(b, a, vec4.fromValues(1, 2, 3, 4), vec4.fromValues(2, 3, 4, 5));
        expect(vec4.equals(b, vec4.fromValues(2, 3, 4, 5))).to.be.true;
    });

});


describe('gl-matrix vec4 extensions abs', () => {

    it('should return the absolute of a vec4 as specified in GLSL', () => {
        const a: vec4 = vec4.fromValues(-2, 2, -1, 1);
        vec4.abs(a, a);
        expect(a[0]).to.equal(2);
        expect(a[1]).to.equal(2);
        expect(a[2]).to.equal(1);
        expect(a[3]).to.equal(1);
    });

});


describe('gl-matrix vec4 extensions', () => {

    it('should derive a vec4 from vec3 as normalized vec4 with w = 1', () => {
        const v3: vec3 = vec3.fromValues(2, 4, 6);
        const v4: vec4 = vec4.fromVec3(v3);
        expect(vec4.equals(v4, vec4.fromValues(2, 4, 6, 1))).to.be.true;
    });

    it('should provide tinified empty vec4 constructors', () => {
        expect(vec4.equals(v4(), vec4.fromValues(0, 0, 0, 0))).to.be.true;
    });

    it('should parse vec4 from string', () => {
        expect(vec4.parse(undefined)).to.be.undefined;
        expect(vec4.parse('')).to.be.undefined;
        expect(vec4.parse('[')).to.be.undefined;

        expect(vec4.parse('[0.0, 0.0, 0.0, 0.0]')).to.be.undefined;

        expect(vec4.parse('0.0')).to.be.undefined;
        expect(vec4.parse('0.0, 0.0')).to.be.undefined;
        expect(vec4.parse('0.0, 0.0, 0.0')).to.be.undefined;
        expect(vec4.parse('0.0, 0.0, 0.0, 0.0, 0.0')).to.be.undefined;

        expect(vec4.equals(vec4.parse('0.0, 0.0, 0.0, 0.0')!, v4())).to.be.true;
        expect(vec4.equals(vec4.parse('1.0, 2.0, 4.0, 8.0')!, vec4.fromValues(1.0, 2.0, 4.0, 8.0))).to.be.true;
    });

    it('should provide default initialized vec and mat abbreviations', () => {
        expect(vec4.equals(vec4.create(), v4())).to.be.true;
    });

});


describe('gl-matrix vec4 extensions (un)packing', () => {

    it('should pack a uint32 into a uint8x4', () => {
        const uint32 = 250285; // 3D1AD > AD, D1, 03, 00
        const uint8x4: vec4 = vec4.create();
        vec4.encode_uint32_to_rgba8(uint8x4, uint32);
        expect(vec4.equals(uint8x4, vec4.fromValues(0xAD, 0xD1, 0x03, 0x00))).to.be.true;
    });

    it('should unpack a uint32 from a uint8x4', () => {
        const uint8x4: vec4 = vec4.fromValues(0xAD, 0xD1, 0x03, 0x00);
        const uint32: number = vec4.decode_uint32_from_rgba8(uint8x4);
        expect(uint32).to.equal(250285);
    });

    it('should pack the maximum uint32 into a uint8x4', () => {
        const uint32 = 4294967295; // FFFFFFFF > FF, FF, FF, FF
        const uint8x4: vec4 = vec4.create();
        vec4.encode_uint32_to_rgba8(uint8x4, uint32);
        expect(vec4.equals(uint8x4, vec4.fromValues(0xFF, 0xFF, 0xFF, 0xFF))).to.be.true;
    });

    it('should unpack a uint32 from the maximum uint8x4', () => {
        const uint8x4: vec4 = vec4.fromValues(0xFF, 0xFF, 0xFF, 0xFF);
        const uint32: number = vec4.decode_uint32_from_rgba8(uint8x4);
        expect(uint32).to.equal(4294967295);
    });

});

