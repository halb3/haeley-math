
/* spellchecker: disable */

import { expect } from 'chai';

import { mat4, m4 } from '../source/mat4';

/* spellchecker: enable */


describe('gl-matrix mat4 extensions', () => {

    it('should provide default initialized vec and mat abbreviations', () => {
        expect(mat4.equals(mat4.create(), m4())).to.be.true;
    });

});
