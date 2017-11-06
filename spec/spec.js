var expect = require('chai').expect;

var _ = require('../index.js');

describe('_ lowbar',() => {
    'use strict'
    it('is an object',  () => {
        expect(_).to.be.an('object');
      });
      describe('#identity', function () {
        it('is a function', function () {
          expect(_.identity).to.be.a('function');
        });
        it('returns whatever arguement is passed into it ', function () {
          expect(_.identity()).to.eql(undefined);
          expect(_.identity('a')).to.eql('a');
          expect(_.identity(7)).to.eql(7);
          expect(_.identity(true)).to.eql(true);
          expect(_.identity([])).to.eql([]);
          expect(_.identity({ name: 'hello' })).to.eql({ name: 'hello' });
        });
      });

})