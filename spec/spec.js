var expect = require('chai').expect;

var _ = require('../index.js');



describe('_ lowbar', () => {
    'use strict'
    it('is an object', () => {
        expect(_).to.be.an('object');
    });

    describe('#identity', () => {
        it('is a function', () => {
            expect(_.identity).to.be.a('function');
        });
        it('returns whatever arguement is passed into it ', () => {
            expect(_.identity()).to.eql(undefined);
            expect(_.identity('a')).to.eql('a');
            expect(_.identity(7)).to.eql(7);
            expect(_.identity(true)).to.eql(true);
            expect(_.identity([])).to.eql([]);
            expect(_.identity({ name: 'hello' })).to.eql({ name: 'hello' });
        });
    });

    describe('#first', () => {
        it('is a function', () => {
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
        it('if passed with a second arguement returns the first of that many characters/indexs from the first arguement', () => {
            expect(_.first('h', 1)).to.eql('h');
            expect(_.first('hello', 2)).to.eql('he');
            expect(_.first([1, 2, 3], 2)).to.eql([1, 2]);
        });
    });

    describe('#last', () => {
        it('is a function', () => {
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
    });


    describe('#each', () => {
        it('is a function', () => {
            expect(_.each).to.be.a('function');
        });

        it(`if passed with an array as the list arguement, 
        calls the function the amount of times equal to the length`, () => {
                let count = 0;
                let incrCount = () => {
                    count++;

                }

                _.each([1, 2, 3], incrCount);
                expect(count).to.equal(3);
            });
        it(`if passed with an object, 
          calls the function the amount of times equal to the amount of key value pairs`, () => {
                let count = 0;
                let incrCount = () => {
                    count++;

                }
                _.each({ a: 1, b: 2, c: 3 }, incrCount);
                expect(count).to.equal(3);
            });
        it(`if passed with a string, 
        calls the function the amount of times equal to the length`, () => {
                let count = 0;
                let incrCount = () => {
                    count++;

                }
                _.each('wow', incrCount)
                expect(count).to.equal(3);
            });
    });

    describe('#indexOf', () => {
        it('is a function', () => {
            expect(_.indexOf).to.be.a('function');
        });
        it('it returns -1 if value is not found or undefined', () => {
            expect(_.indexOf()).to.equal(-1);
            expect(_.indexOf([])).to.equal(-1);
            expect(_.indexOf({})).to.equal(-1);
            expect(_.indexOf([1, 2, 3], 4)).to.equal(-1);
        });
        it('returns the index of search value', () => {
            expect(_.indexOf([1, 2, 3], 1)).to.equal(0);
            expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
            expect(_.indexOf(['hello', 'goodbye'], 'hello')).to.equal(0);
        });
    });

    describe('#filter', () => {
        it('it is a function', () => {
            expect(_.filter).to.be.a('function');
        });
        it('returns an empty array when passed with an empty array', () => {
            expect(_.filter([])).to.eql([]);
            expect(_.filter([], 5)).to.eql([]);
            expect(_.filter()).to.eql([]);

        });
        it('returns an array filtered with the predicate when passed with an array', () => {
            let lowerThan10 = (a) => {
                return a < 10;
            }
            expect(_.filter([1, 2, 11, 12, 10, 9], lowerThan10)).to.eql([1, 2, 9]);
            expect(_.filter([7, 6, 5, 100, 47, 2], lowerThan10)).to.eql([7, 6, 5, 2]);
        });
        it('returns an array filtered with the predicate when passed with a string', () => {
            let letterIsVowel = (a) => {
                let l = a.toLowerCase()
                return l === 'a' || l === 'e' || l === 'i' || l === 'o' || l === 'u';
            }
            expect(_.filter('hello', letterIsVowel)).to.eql(['e', 'o']);
        });
        it('returns an array filtered with the predicate when passed with an object', () => {
            let greaterThan10 = (a) => {
                return a > 10;
            }
            expect(_.filter({ a: 1, b: 20, c: 9 }, greaterThan10)).to.eql([20]);
            expect(_.filter({ a: 5, b: 10, c: 15, d: 90 }, greaterThan10)).to.eql([15, 90]);
        });
    });

    describe('#reject', () => {
        it('it is a function', () => {
            expect(_.filter).to.be.a('function');
        });
        it('returns an empty array when passed with an empty array', () => {
            expect(_.filter([])).to.eql([]);
            expect(_.filter([], 5)).to.eql([]);
            expect(_.filter()).to.eql([]);

        });
        it('returns an array filtered with the predicate when passed with an array', () => {
            let lowerThan10 = (a) => {
                return a < 10;
            }
            expect(_.reject([1, 2, 11, 12, 10, 9], lowerThan10)).to.eql([11, 12, 10]);
            expect(_.reject([7, 6, 5, 100, 47, 2], lowerThan10)).to.eql([100, 47]);
        });
        it('returns an array filtered with the predicate when passed with a string', () => {
            let letterIsVowel = (a) => {
                let l = a.toLowerCase()
                return l === 'a' || l === 'e' || l === 'i' || l === 'o' || l === 'u';
            }
            expect(_.reject('hello', letterIsVowel)).to.eql(['h', 'l', 'l']);
        });
        it('returns an array filtered with the predicate when passed with an object', () => {
            let greaterThan10 = (a) => {
                return a > 10;
            }
            expect(_.reject({ a: 1, b: 20, c: 9 }, greaterThan10)).to.eql([1, 9]);
            expect(_.reject({ a: 5, b: 10, c: 15, d: 90 }, greaterThan10)).to.eql([5, 10]);
        });
    });

    describe('#uniq', function () {
        it('it is a function', () => {
            expect(_.uniq).to.be.a('function');
        });
        it('returns the input array if all members are not unique', () => {
            expect(_.uniq([1, 2, 3])).to.eql([1, 2, 3]);
            expect(_.uniq([])).to.eql([]);

        });
        it('removes repeated items from an array', () => {
            expect(_.uniq([1, 1, 2])).to.eql([1, 2]);
        });
    });
    describe('#map', () => {
        it('it is a function', () => {
            expect(_.map).to.be.a('function');
        });
        it('returns an array', () => {
            expect(_.map()).to.eql([]);

        });
        it('returns a new array with every element passed through the function', () => {
            let times10 = (a) => {
                return a * 10;
            };
            let capitalize = (str) => {
                return str.toUpperCase();
            };
            let count = 0;
            let incrCount = () => {
                count++;
            };
            _.map([1, 2, 3, 4], incrCount);
            expect(count).to.equal(4);
            expect(_.map([1, 2, 3, 4], times10)).to.eql([10, 20, 30, 40]);
            expect(_.map(['a', 'b'], capitalize)).to.eql(['A', 'B']);
            expect(_.map({ one: 1, two: 2, three: 3 }, times10)).to.eql([10, 20, 30]);
        });
    });

    describe('#contains', () => {
        it('it is a function', () => {
            expect(_.contains).to.be.a('function');
        });
        it('it returns false if one or less arguments are passed', () => {
            expect(_.contains()).to.equal(false);
            expect(_.contains('anything')).to.equal(false);
            expect(_.contains([1, 2, 3])).to.equal(false);
        });
        it('returns true if value present in array', () => {
            expect(_.contains([1, 2, 3], 1)).to.equal(true);
            expect(_.contains([1, 2, 3], 5)).to.equal(false);
            expect(_.contains('hello', 'h')).to.equal(true);
            expect(_.contains({ a: 1, b: 2, c: 3 }, 5)).to.equal(false);
        });
    });

    describe('#pluck', () => {
        it('it is a function', () => {
            expect(_.pluck).to.be.a('function');
        });
        it('it returns the first arguement if the first arguement is not an array', () => {
            expect(_.pluck()).to.eql([]);
            expect(_.pluck('anything')).to.eql([]);
            expect(_.pluck(2)).to.eql([]);
        });
        it('returns the values coresponding to a given key value in an array of objects', () => {
            expect(_.pluck([{ name: 'hello' }], 'name')).to.eql(['hello']);
            expect(_.pluck([{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }], 'name')).to.eql(['moe', 'larry', 'curly']);
            expect(_.pluck([{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }], 'age')).to.eql([40, 50, 60]);
            expect(_.pluck([{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }], 'oiuytrf')).to.eql([undefined, undefined, undefined]);
            expect(_.pluck({ a: { name: 'moe', age: 40 }, b: { name: 'larry', age: 50 }, c: { name: 'curly', age: 60 } }, 'name')).to.eql(['moe', 'larry', 'curly']);
        });
    });


    describe('#reduce', () => {
        var rrTestFuncSum = (a, b) => {
            return a + b;
        };
        var rrTestFuncExp = (a, b) => {
            return a * b;
        };
        var rrTestFuncStringMess = (a, b) => {
            return b += a.split('').reverse().join('');
        };
        var testArray = [1, 3, 5];
        var testWords1 = ['thomas', 'richard', 'henry'];
        var testWords2 = ['richard', 'henry'];

        it('should be a function', function () {
            expect(_.reduce).to.be.a('function');
        });
        it('should output according to the function input', () => {
            expect(_.reduce(testArray, rrTestFuncSum, 0)).to.be.a('number');
        });
        it('should sum numbers', () => {
            expect(_.reduce(testArray, rrTestFuncSum, 0)).to.eql(9);
        });
        it('should sum numbers even if given no base arguement', () => {
            expect(_.reduce(testArray, rrTestFuncSum)).to.equal(9);
        });
        it('should multiply numbers even if given no base arguement', () => {
            expect(_.reduce(testArray, rrTestFuncExp)).to.equal(15);
        });
        it('should implement mildly complex functions on strings', () => {
            expect(_.reduce(testWords2, rrTestFuncStringMess, '')).to.equal('henrydrahcir');
            expect(_.reduce(testWords1, rrTestFuncStringMess)).to.equal('henrythomasdrahcir');
        });
    });


    describe('#every', () => {
        it('it is a function', () => {
            expect(_.every).to.be.a('function');
        });
        it('it returns true if passed with no second arguement', () => {
            expect(_.every()).to.equal(true);
            expect(_.every([1, 2, 3, 4])).to.equal(true);
            expect(_.every(234)).to.equal(true);
            expect(_.every('234')).to.equal(true);
        });
        it('it returns true/false if all items in the first arguement pass/fail the predicate fn', () => {
            let lower10 = (a) => {
                return a < 10;
            }
            expect(_.every([1, 2, 3], lower10)).to.equal(true);
            expect(_.every([1, 2, 3, 40], lower10)).to.equal(false);
            expect(_.every({ a: 1, b: 2 }, lower10)).to.equal(true);
        });
    });



    describe('#some', () => {
        it('it is a function', () => {
            expect(_.some).to.be.a('function');
        });
        it('it returns true if passed with no second arguement', () => {
            expect(_.some()).to.equal(true);
            expect(_.some([1, 2, 3, 4])).to.equal(true);
            expect(_.some(234)).to.equal(true);
            expect(_.some('234')).to.equal(true);
        });
        it('it returns true/false if one item in the first arguement pass/fail the predicate fn', () => {
            let lower10 = (a) => {
                return a < 10;
            }
            expect(_.some([20, 30, 40], lower10)).to.equal(false);
            expect(_.some([1, 2, 3, 40], lower10)).to.equal(true);
            expect(_.some({ a: 1, b: 20 }, lower10)).to.equal(true);
        });
    });
    describe('#extend', function () {
        it('it is a function', function () {
            expect(_.extend).to.be.a('function');
        });
        it('if no arguments passed returns undefined', function () {
            expect(_.extend()).to.equal(undefined);
        });
        it('if not passed with any objects returns first argument', function () {
            expect(_.extend(3, 'tre', true)).to.equal(3);
            expect(_.extend(1, null, 1)).to.equal(1);
        });
        it('ignores any non objects', function () {
            expect(_.extend({}, 2, 3, { a: 1 }, 'string')).to.eql({ a: 1 });
            expect(_.extend({}, 2, 3, { a: 1 })).to.eql({ a: 1 });

        });
        it('copies all the properties of given objects into one object', function () {
            expect(_.extend({ name: 'moe' }, { age: 50 })).to.eql({ name: 'moe', age: 50 });
            expect(_.extend({ name: 'moe' }, [1])).to.eql({ name: 'moe', '0': 1 });
            expect(_.extend({ name: 'moe' }, { age: 50 }, { address: '12a' })).to.eql({ name: 'moe', age: 50, address: '12a' });
        });
    });

    describe('#defaults', () => {
        it('it is a function', () => {
            expect(_.defaults).to.be.a('function');
        });
        it('if no arguments passed returns undefined', () => {
            expect(_.defaults()).to.equal(undefined);
        });
        it('if not passed with any objects returns first argument', () => {
            expect(_.defaults(1, 2)).to.equal(1);
            expect(_.defaults('hello', 'world')).to.equal('hello');
            expect(_.defaults(1, null)).to.equal(1);
        });
        it('it should add or replace a given key value pair in an object', () => {
            expect(_.defaults({ flavor: 'chocolate' }, { flavor: 'vanilla', sprinkles: 'lots' })).to.eql({ flavor: 'chocolate', sprinkles: 'lots' });
            expect(_.defaults({ age: 10 }, { name: 'dan' })).to.eql({ age: 10, name: 'dan' });
            expect(_.defaults({ age: 10 }, { name: 'dan', age: 20, address: 'yolo' })).to.eql({ age: 10, name: 'dan', address: 'yolo' });
        });
    });

    describe('#once', () => {
        it('is a function', () => {
            expect(_.once).to.be.a('function');
        });
        it('returns a function', () => {
            expect(_.once()).to.be.a('function');
        });

        it('returns a function that is a version of the passed function that can only be called one time', () => {
            let count = 0
            function counter() {
                count++
            }
            let test = _.once(counter)
            test()
            test()
            expect(count).to.equal(1);
        });
    });

    describe('#negate', () => {
        it('is a function', () => {
            expect(_.negate).to.be.a('function');
        });
        it('returns a function', () => {
            expect(_.negate()).to.be.a('function');
        });
        function isOne(x) {
            return x === 1;
        }
        let test = _.negate(isOne);
        it('returns a function that is the opposite of what was passed', () => {
            expect(test(1)).to.equal(false);
        })
    });

    describe('#shuffle', () => {
        it('is a function', () => {
            expect(_.shuffle).to.be.a('function');
        });
        it('returns a list of the same length', () => {
            expect(_.shuffle([1, 2, 3]).length).to.eql([1, 2, 3].length)
        })
        it('should maintain the contents of the array', () => {
            expect(_.shuffle([1, 2, 3, 4, 5]).sort()).to.eql([1, 2, 3, 4, 5])
        })
        it('should consistantly shuffle the array in question', () => {
            let unlikely = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            expect((_.shuffle(unlikely)[1] === _.shuffle(unlikely)[1])).to.equal(false)
            expect((_.shuffle(unlikely)[9] === _.shuffle(unlikely)[9])).to.equal(false)
            expect((_.shuffle(unlikely)[12] === _.shuffle(unlikely)[12])).to.equal(false)
        })
    })

    describe('#invokes', () => {

        it('to be a function', () => {
            expect(_.invokes).to.be.a('function')
        })

        it('should call sort method on each element in an array and return results in an array', () => {
            expect(_.invokes([[5, 1, 7], [3, 2, 1]], "sort")).to.eql([[1, 5, 7], [1, 2, 3]])
        })

        it('should call sort method on each element in an object and return results in an array', () => {
            expect(_.invokes({a:[5, 1, 7], b:[3, 2, 1]}, "sort")).to.eql([[1, 5, 7], [1, 2, 3]])
        })
        it('should be able to pass other arguments into the function', () => {
            expect(_.invokes(['hello'], 'concat','World')).to.eql(['helloWorld'])
        })
    })



})



// it "", ->
// result = _.invoke([[5, 1, 7], [3, 2, 1]], "sort");
// expect(result).toEqual([[1, 5, 7], [1, 2, 3]])

// it "should call sort method on each value in an object and return results in an array", ->
// result = _.invoke({a: [5, 1, 7], b: [3, 2, 66]}, "sort")
// expect(result).toEqual([[1, 5, 7], [2, 3, 66]])

// it "should pass extra arguments onto method invocation", ->
// result = _.invoke(["lol"], "concat", "bbq")
// expect(result).toEqual(["lolbbq"])