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
_.each = function (list, fn) {
    if (typeof list === 'string') { return _.each(list.split(''), fn) }
    if (typeof list !== 'object') { return list; }
    if (list === null) { return null; }
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            fn(list[i], i, list);
        }
    }
    else {
        var values = Object.values(list);
        for (let j = 0; j < values.length; j++) {
            fn(values[j], j, values);
        }
    }
};

_.indexOf = function (arr, val) {
    let final = -1;
    if (!Array.isArray(arr)) return final;
    if (arr[0] === undefined) return final;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            final = i;
            return final;
        }
    }
    return final;
};

_.filter = function (list, pred) {
    let final = []
    let genPushFunc = (fn) => {
        return (a) => {
            if (fn(a) === true) {
                final.push(a)
            }
        }
    }
    _.each(list, genPushFunc(pred))
    return final

}

_.reject = function (list, pred) {
    let final = []
    let genPushFunc = (fn) => {
        return (a) => {
            if (fn(a) === false) {
                final.push(a)
            }
        }
    }
    _.each(list, genPushFunc(pred))
    return final

}
_.uniq = function (list) {
    let capture = {}
    let nList = Object.values(list)
    _.each(nList, (a) => {
        capture[a] = a
    })
    return Object.values(capture)

}

_.map = function (list, func) {
    let arr = []
    function pusher(fn) {
        return (y) => {
            arr.push(fn(y))
        }
    }
    _.each(list, pusher(func))

    return arr

}

_.contains = function (list, val) {
    if (list === undefined) { return false }
    let arr = Object.values(list)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return true;
    }

    return false;
};

_.pluck = function (list, val) {
    if (typeof list !== 'object') { return [] }
    if (list === null) { return [] }
    arr = Object.values(list)
    let final = _.map(arr, (item) => {
        return item[val];
    });
    return final;
};


_.reduce = function (list, iteratee, initial) {
    if (initial === undefined) {
        initial = list[0]
        list = list.slice(1)
    }
    let acc = initial;
    let arr = Object.values(list)
    for (let i = 0; i < arr.length; i++) {
        acc = iteratee(acc, arr[i], i, arr);
    }
    return acc;
};

_.every = function (list, fn) {
    if (fn === undefined) return true;
    if (typeof list !== 'object') { return true; }
    list = Object.values(list);
    let test = true;
    for (let i = 0; i < list.length; i++) {
        if (test) test = fn(list[i]);
    }
    return test;
};

_.some = function (list, fn) {
    if (fn === undefined) return true;
    if (typeof list !== 'object') { return true; }
    list = Object.values(list);
    let test = false;
    for (let i = 0; i < list.length; i++) {
        if (!test) {
            test = fn(list[i]);
        }
    }
    return test;
};

_.extend = function () {
    if (Object.values(arguments).length === 0) { return undefined }
    if (Object.values(arguments).length === 1) { return arguments[0] }
    let extentions = _.filter(arguments, (item, i) => {
        if (i === 0) { return false }
        if (typeof item === 'object') { return true }
        else return false
    })
    let objs = [arguments[0]].concat(extentions)

    let final = Object.assign.apply(null, objs)
    if (Object.values(final).length === 0) { return arguments[0] }
    arguments[0] = final
    return arguments[0]
}

_.defaults = function () {
    if (Object.values(arguments).length === 0) { return undefined }
    if (Object.values(arguments).length === 1) { return arguments[0] }
    let extentions = _.filter(arguments, (item, i) => {
        if (i === 0) { return false }
        if (typeof item === 'object' && item !== null) { return true }
        else return false
    })
    if (extentions.length === 0) { return arguments[0] }
    let objs = [arguments[0]].concat(extentions).reverse()
    let final = Object.assign.apply(null, objs)
    arguments[0] = final
    return arguments[0]
}

_.once = function (fn) {
    let limit = 0
    return () => {
        if (limit > 0) { return }
        limit++
        return fn()
    }

};

_.negate = function (fn) {
    return (x) => {
        return fn(x) === false;
    }
}
_.shuffle = function (set) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let length = set.length;
    let shuffled = new Array(length);
    for (let i = 0; i < length; i++) {
        rand = getRandomInt(0, i);
        if (rand !== i) shuffled[i] = shuffled[rand];
        shuffled[rand] = set[i];
    }
    return shuffled;


}

_.invokes = function (obj, methodname) {
    let args = Object.values(arguments)
    args = args.slice(2)
    return _.map(obj, (value) => {
        var val = value[methodname];
        if (val === null) { return value }
        return val.apply(value, args);
    });
}


_.zip = function () {
    let capture = {}
    let list = Object.values(arguments)
    _.each(list, (item) => {
        _.each(item, (element, i) => {
            if (!capture[i]) { capture[i] = [] }
            capture[i].push(element)
        })
    })
    return Object.values(capture)

}


_.sortedIndex = function (array, obj, fn) {
    let low = 0
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
            var mid = Math.floor((low + high) / 2);
            if (fn(array[mid]) < fn(obj)) low = mid + 1; else high = mid;
        }
        return low;
    }
};

_.flatten = function (list, bool) {
    let final = []
    function flatten(array, pred) {
        array.forEach(function (item) {
            if (Array.isArray(item)) {
                item.forEach((ele) => {
                    if (!pred) {
                        if (Array.isArray(ele)) {
                            return flatten(ele)
                        }
                    }
                    final.push(ele)
                })
            }
            else final.push(item)

        })
        return final
    }
    return flatten(list, bool)

}

_.sortBy = function (list, fn, con) {
    let data =null
    if (con){
         data = _.map(list, (item, i, fullList) => {
            return {
                OriginVal: item,
                index: i,
                eval: fn(item[con], i, fullList)
            }
        })

    }
    else if(!con) {
       
        data = _.map(list, (item, i, fullList) => {
        return {
            OriginVal: item,
            index: i,
            eval: fn(item, i, fullList)
        }
    })}
    let sorted = data.sort((a, b)=>{
        let first = a.eval
        let second = b.eval
        if(first !== second){
            if(first > second || first === undefined) return 1
            if(second > first || second === undefined) return -1
        }
        return a.index - b.index

    })
    return _.pluck(sorted,'OriginVal')

}


_.intersection = function () {

}

_.difference = function () {

}

_.memorize = function () {

}
_.delay = function () {

}
_.where = function () {

}

_.throttle = function () {

}

_.partial = function () {

}


module.exports = _