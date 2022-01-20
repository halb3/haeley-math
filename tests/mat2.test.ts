
/* spellchecker: disable */

import { expect } from 'chai';

import { mat2, m2 } from '../source/mat2';

/* spellchecker: enable */


describe('gl-matrix mat2 extensions', () => {

    it('should provide default initialized vec and mat abbreviations', () => {
        expect(mat2.equals(mat2.create(), m2())).to.be.true;
    });

});
