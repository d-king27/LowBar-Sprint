const _ = {};

_.identity = function (x) {
    return x;
};

_.first = function (input, n = 1) {
    if (Array.isArray(input) === true || typeof input === 'string') {
        if (n === 1) { return input[0]; }
        return input.slice(0, n);
    }
    return input;
};

_.last = function (input, n = 1) {
    if (Array.isArray(input) === true || typeof input === 'string') {
        if (n === 1) { return input[input.length - 1]; }
        return input.slice(-n);
    }
    return input;

};

_.each = function (list, fn = _.identity,context=null) {
    if(!list){return undefined}
    list = Object.values(list)
    let length = list.length
    for(let i = 0;i<length;i++){
        fn.call(context,list[i],i,list)
    }

};


_.filter = function (list, pred= _.identity,context=null) {
    let final = [];
    let genPushFunc = (fn,con) => {
        return (a,b,c) => {
            if (fn.call(con,a,b,c) === true) {
                final.push(a);
            }
        };
    };
    _.each(list, genPushFunc(pred,context));
    return final;

};

_.reject = function (list, pred= _.identity,context=null) {
    let final = [];
    let genPushFunc = (fn,con) => {
        return (a,b,c) => {
            if (fn.call(con,a,b,c) === false) {
                final.push(a);
            }
        };
    };
    _.each(list, genPushFunc(pred,context));
    return final;

};
_.uniq = function (list) {
    let capture = {};
    let nList = Object.values(list);
    _.each(nList, (a) => {
        capture[a] = a;
    });
    return Object.values(capture);

};

_.map = function (list, func= _.identity,context) {
    let arr = [];
    function pusher(fn,con) {
        return (x,y,z) => {
            arr.push(fn.call(con,x,y,z));
        };
    }
    _.each(list, pusher(func,context));

    return arr;

};

_.contains = function (list, val, index = 0) {
    if (list === undefined) { return false; }
    let arr = Object.values(list);
    for (let i = index; i < arr.length; i++) {
        if (arr[i] === val) return true;
    }

    return false;
};

_.pluck = function (list, val,context) {
    if (typeof list !== 'object') { return []; }
    if (list === null) { return []; }
    let arr = Object.values(list);
    let final = _.map(arr, (item) => {
        return item[val];
    },context);
    return final;
};


_.reduce = function (list, iteratee = _.identity, initial,context=null) {
    let arr = Object.values(list);
    if (initial === undefined) {
        initial = arr[0];
        arr = arr.slice(1);
    }
    let acc = initial;
    for (let i = 0; i < arr.length; i++) {
        acc = iteratee.call(context,acc, arr[i], i, arr);
    }
    return acc;
};

_.every = function (list, fn,context=null) {
    if (fn === undefined) return true;
    if (typeof list !== 'object') { return true; }
    list = Object.values(list);
    let test = true;
    for (let i = 0; i < list.length; i++) {
        if (test) test = fn.call(context,list[i]);
    }
    return test;
};

_.some = function (list, fn,context=null) {
    if (fn === undefined) return true;
    if (typeof list !== 'object') { return true; }
    list = Object.values(list);
    let test = false;
    for (let i = 0; i < list.length; i++) {
        if (!test) {
            test = fn.call(context,list[i]);
        }
    }
    return test;
};

_.extend = function () {
    if (Object.values(arguments).length === 0) { return undefined; }
    if (Object.values(arguments).length === 1) { return arguments[0]; }
    let extentions = _.filter(arguments, (item, i) => {
        if (i === 0) { return false; }
        if (typeof item === 'object') { return true; }
        else return false;
    });
    let objs = [arguments[0]].concat(extentions);

    let final = Object.assign.apply(null, objs);
    if (Object.values(final).length === 0) { return arguments[0]; }
    arguments[0] = final;
    return arguments[0];
};

_.defaults = function () {
    if (Object.values(arguments).length === 0) { return undefined; }
    if (Object.values(arguments).length === 1) { return arguments[0]; }
    let extentions = _.filter(arguments, (item, i) => {
        if (i === 0) { return false; }
        if (typeof item === 'object' && item !== null) { return true; }
        else return false;
    });
    if (extentions.length === 0) { return arguments[0]; }
    let objs = [arguments[0]].concat(extentions).reverse();
    let final = Object.assign.apply(null, objs);
    arguments[0] = final;
    return arguments[0];
};

_.once = function (fn) {
    let limit = 0;
    return () => {
        if (limit > 0) { return; }
        limit++;
        return fn();
    };

};

_.negate = function (fn) {
    return (x) => {
        return fn(x) === false;
    };
};
_.shuffle = function (set) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let length = set.length;
    let shuffled = new Array(length);
    for (let i = 0; i < length; i++) {
        let rand = getRandomInt(0, i);
        if (rand !== i) shuffled[i] = shuffled[rand];
        shuffled[rand] = set[i];
    }
    return shuffled;


};

_.invokes = function (obj, methodname) {
    let args = Object.values(arguments);
    args = args.slice(2);
    return _.map(obj, (value) => {
        var val = value[methodname];
        if (val === null) { return value; }
        return val.apply(value, args);
    });
};


_.zip = function (x) {
    let capture = {};
    let list = Object.values(arguments);
    if (list.length === 0) { return []; }
    if (list.length === 1) { return x; }
    _.each(list, (item) => {
        _.each(item, (element, i) => {
            if (!capture[i]) { capture[i] = []; }
            capture[i].push(element);
        });
    });
    return Object.values(capture);

};


_.sortedIndex = function (array, obj, fn) {
    let low = 0;
    let high = array.length;
    if (fn === undefined) {
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (array[mid] < obj) low = mid + 1; else high = mid;
        }
        return low;
    }
    else {
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            if (fn(array[mid]) < fn(obj)) low = mid + 1; else high = mid;
        }
        return low;
    }
};

_.flatten = function (list, bool) {
    if (!list) { return []; }
    let final = [];
    function flatten(array, pred) {
        array.forEach(function (item) {
            if (Array.isArray(item)) {
                item.forEach((ele) => {
                    if (!pred) {
                        if (Array.isArray(ele)) {
                            return flatten(ele);
                        }
                    }
                    final.push(ele);
                });
            }
            else final.push(item);

        });
        return final;
    }
    return flatten(list, bool);

};

_.sortBy = function (list, fn = _.identity, con) {
    let data = null;
    if (con) {
        data = _.map(list, (item, i, fullList) => {
            return {
                OriginVal: item,
                index: i,
                eval: fn(item[con], i, fullList)
            };
        });

    }
    else if (!con) {

        data = _.map(list, (item, i, fullList) => {
            return {
                OriginVal: item,
                index: i,
                eval: fn(item, i, fullList)
            };
        });
    }
    let sorted = data.sort((a, b) => {
        let first = a.eval;
        let second = b.eval;
        if (first !== second) {
            if (first > second || first === undefined) return 1;
            if (second > first || second === undefined) return -1;
        }
        return a.index - b.index;

    });
    return _.pluck(sorted, 'OriginVal');

};


_.intersection = function () {
    let arrays = Object.values(arguments);
    let capture = {};
    _.each(arrays, (item, i) => {
        if (i === 0) {
            _.each(item, (ele) => {
                capture[ele] = {
                    val: ele,
                    bool: true
                };
            });
        }
        else {
            for (let key in capture) {
                if (!_.contains(item, capture[key].val)) {
                    capture[key].bool = false;
                }
            }

        }

    });

    let final = [];
    for (let key in capture) {
        if (capture[key].bool === true) {
            final.push(capture[key].val);
        }
    }
    return final;
};

_.difference = function () {
    let arrays = Object.values(arguments);
    let prime = arrays[0];
    let rest = _.flatten(arrays.slice(1));
    return _.filter(prime, (item) => {
        return !_.contains(rest, item);
    });


};

_.delay = function (fn = _.identity, time) {
    var args = Object.values(arguments).slice(1);
    return setTimeout(() => {
        return fn.apply(null, args);
    }, Number(time));
};

_.where = function (list, obj = {}) {
    if (!list) { return []; }
    let keys = Object.keys(obj);

    return _.filter(list, (item) => {
        let bool = true;
        _.each(keys, (key) => {
            if (item[key] === obj[key]) { }
            else bool = false;

        });
        return bool;

    });

};

_.memoize = function (func = _.identity) {
    var cache = {};

    return function () {
        var arg = JSON.stringify(arguments);
        if (!cache[arg]) {
            cache[arg] = func.apply(this, arguments);
        }

        return cache[arg];
    };
};


_.partial = function (fn = _.identity) {
    let args = Object.values(arguments).slice(1);
    return function () {
        let inputArgs = Object.values(arguments);
        let counter = 0;
        let newArgs = _.map(args, (item) => {
            if (item === '_') {
                let count = counter;
                counter++;
                return inputArgs[count];
            }
            else return item;

        });
        newArgs = newArgs.concat(inputArgs.slice(counter));
        return fn.apply(this, newArgs);
    };
};

_.values = function (list) {
    if (typeof list === 'string') { return [] }
    return Object.values(list)
}

_.sortedIndex = function (array, val, fn = _.identity, context) {
    if(!val){return 0}
    if (context) {
        array = _.pluck(array, context)
    }
    let value = fn(val);
    let low = 0
    let high = array.length;
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (fn(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
};

_.indexOf = function (arr, val) {
    let final = -1;
    if (!Array.isArray(arr)) return final;
    if (arr[0] === undefined) return final;
    if(arr[0]===val){return 0}
    let low = 0
    let high = arr.length;
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === val) { return mid }
        if (arr[mid] > val) low = mid + 1;
        else high = mid;
    }
    return final;
};


_.throttle = function (func, delay) {
    var timer = 0;

    return function () {
        let context = this
        let args = Object.values(arguments).slice(0);

        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}



module.exports = _;