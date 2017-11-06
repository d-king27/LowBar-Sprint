var expect = require('chai').expect;

var _ = require('../index.js');

let count;
const incrCount = () => {
  count++;

}


describe('_ lowbar', () => {
    'use strict'
    it('is an object', () => {
        expect(_).to.be.an('object');
    });

    describe('#identity',  () => {
        it('is a function',  () => {
            expect(_.identity).to.be.a('function');
        });
        it('returns whatever arguement is passed into it ',  () => {
            expect(_.identity()).to.eql(undefined);
            expect(_.identity('a')).to.eql('a');
            expect(_.identity(7)).to.eql(7);
            expect(_.identity(true)).to.eql(true);
            expect(_.identity([])).to.eql([]);
            expect(_.identity({ name: 'hello' })).to.eql({ name: 'hello' });
        });
    });

    describe('#first', () => {
        it('is a function',  () => {
            expect(_.first).to.be.a('function');
        });
        it('returns the original arguement if not passed with either an array or string  ', () => {
            expect(_.first(1)).to.eql(1);
            expect(_.first()).to.equal(undefined);
            expect(_.first(true)).to.equal(true);
        });
        it('returns the first item if give an array as an arguement  ', () => {
            expect(_.first([1])).to.eql(1);
            expect(_.first([1, 2, 3])).to.eql(1);
            expect(_.first([7, 3, 2, 1, 3, 4])).to.eql(7);
        });
        it('returns the first chracter if give a string as an arguement  ', () => {
            expect(_.first('h')).to.eql('h');
            expect(_.first('hell')).to.eql('h');
            expect(_.first('test')).to.eql('t');
        });
        it('if passed with a second arguement returns the first of that many characters/indexs from the first arguement',  () => {
            expect(_.first('h', 1)).to.eql('h');
            expect(_.first('hello', 2)).to.eql('he');
            expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
        });
    });

    describe('#last',  () => {
        it('is a function',  () => {
            expect(_.last).to.be.a('function');
        });
        it('returns the original arguement if not passed with either an array or string  ', () => {
            expect(_.last(1)).to.eql(1);
            expect(_.last()).to.equal(undefined);
            expect(_.last(true)).to.equal(true);
        });
        it('returns the last item if give an array as an arguement  ', () => {
            expect(_.last([1])).to.eql(1);
            expect(_.last([1, 2, 3])).to.eql(3);
            expect(_.last([7, 3, 2, 1, 3, 4])).to.eql(4);
        });
        it('returns the last chracter if give a string as an arguement  ', () => {
            expect(_.last('h')).to.eql('h');
            expect(_.last('hell')).to.eql('l');
            expect(_.last('test')).to.eql('t');
        });
        it('if passed with a second arguement returns the last of that many characters/indexs from the first arguement', () => {
            expect(_.last('h')).to.eql('h');
            expect(_.last('hello', 2)).to.eql('lo');
            expect(_.last([1, 2, 3, 4], 3)).to.eql([2, 3, 4]);
        });
    })

    describe('#each',  () => {
        it('is a function', () => {
          expect(_.each).to.be.a('function');
        });
       
        it(`if passed with an array as the list arguement, 
        calls the function the amount of times equal to the length`, () => {
            let count = 0;
            _.each([1, 2, 3], incrCount);
            expect(count).to.equal(3);
          });
        it(`if passed with an object, 
          calls the function the amount of times equal to the amount of key value pairs`,() => {
            let count = 0;
            _.each({ a: 1, b: 2, c: 3 }, incrCount);
            expect(count).to.equal(3);
          });
        it(`if passed with a string, 
        calls the function the amount of times equal to the length`,  () => {
            let count = 0;
            _.each('wow', incrCount)
            expect(count).to.equal(3);
          });
      });
})