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
            fn(list[i]);
        }
    }
    else {
        var values = Object.values(list);
        for (let j = 0; j < values.length; j++) {
            fn(values[j]);
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
    if(list === undefined) {return false}
   let arr = Object.values(list)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return true;
      }
    
    return false;
  };

  _.pluck = function (list, val) {
      if (typeof list !== 'object'){return []}
      if(list === null){return []}
      arr = Object.values(list)
      let final = _.map(arr,  (item) => {
        return item[val];
      });
    return final;
  
  };


module.exports = _