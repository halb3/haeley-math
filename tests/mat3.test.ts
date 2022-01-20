
/* spellchecker: disable */

import { expect } from 'chai';

import { mat3, m3 } from '../source/mat3';

/* spellchecker: enable */


describe('gl-matrix mat3 extensions', () => {

    it('should provide default initialized vec and mat abbreviations', () => {
        expect(mat3.equals(mat3.create(), m3())).to.be.true;
    });

});
