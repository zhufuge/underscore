var _ = null;

(function(){
  _ = this;

  _.each = function(obj, iteratee) {
    var length, i;

    if (obj instanceof Array) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else if (obj instanceof Object) {
      for (i in obj) {
        iteratee(obj[i], i, obj);
      }
    }
    return obj;
  };

  // _.each([1, 2, 3], console.log);
  // _.each({one: 1, two: 2, three: 3}, console.log);

  _.map = function(obj, iteratee) {
    var length, i,
        result = [];

    if (obj instanceof Array) {
      for (i = 0, length = obj.length; i < length; i++) {
        result[i] = iteratee(obj[i], i, obj);
      }
    } else if (obj instanceof Object) {
      var j = 0;
      for (i in obj) {
        result[j++] = iteratee(obj[i], i, obj);
      }
    }
    return result;
  };

  // console.log(_.map([1, 2, 3], function(num) {return num * 3;}));
  // console.log(_.map({one: 1, two: 2, three: 3}, function(num, key){
  //   return num * 3;
  // }));


  _.reduce = function(obj, iteratee, memo) {
    var length, i,
        result = memo || 0;

    if (obj instanceof Array) {
      for (i = 0, length = obj.length; i < length; i++) {
        result = iteratee(result, obj[i], i, obj);
      }
    } else if (obj instanceof Object) {
      for (i in obj) {
        result = iteratee(result, obj[i], i, obj);
      }
    }

    return result;
  };

  // var sum = _.reduce([2, 2, 3], function(a, b) {return a + b;});
  // console.log(sum);

  _.reduceRight = function(obj, iteratee, memo) {
    var i, result = memo || 0;

    if (obj instanceof Array) {
      for (i = obj.length - 1; i >= 0; i--) {
        result = iteratee(result, obj[i], i, obj);
      }
    } else if (obj instanceof Object) {
      var key = [];
      for (i in obj) {
        key.push(i);
      }
      for (i = key.length - 1; i >= 0; i--) {
        result = iteratee(result, obj[key[i]], key[i], obj);
      }
    }

    return result;
  };

  // var sum = _.reduceRight([[0, 1], [2, 3], [4, 5]], function(a, b) {
  //   return a.concat(b);
  // }, []);
  // console.log(sum);


  _.find = function(obj, predicate) {
    var i, length;

    if (obj instanceof Array) {
      for (i = 0, length = obj.length; i < length; i++) {
        if (predicate(obj[i], i, obj)) {
          return obj[i];
        }
      }
    } else if (obj instanceof Object) {
      for (i in obj) {
        if (predicate(obj[i], i, obj)) {
          return obj[i];
        }
      }
    }
    return undefined;
  };

  // var even = _.find([1, 3, 5, 6], function(num){ return num % 2 === 0; });
  // console.log(even);

  _.createFilter = function(condition) {
    return function(obj, predicate) {
      var i, length, result;

      if (obj instanceof Array) {
        result = [];
        for (i = 0, length = obj.length; i < length; i++) {
          if (predicate(obj[i], i, obj) === condition) {
            result.push(obj[i]);
          }
        }
      } else if (obj instanceof Object) {
        result = {};
        for (i in obj) {
          if (predicate(obj[i], i, obj) === condition) {
            result[i] = obj[i];
          }
        }
      }

      return result;
    };
  };

  _.filter = _.createFilter(true);
  _.reject = _.createFilter(false);

  // var even = _.reject([1, 2, 5, 9, 10], function(num){ return num % 2 === 0; });
  // console.log(even);


  _.where = function(obj, properties) {
    if (!(obj instanceof Array)) {
      return [];
    }

    if (!(properties instanceof Object)) {
      return obj;
    }

    var i, j, k,
        length,
        proLength,
        count,
        result = [],
        keys = [];

    for (var key in properties) {
      keys.push(key);
    }

    proLength = keys.length;

    for (i = 0, length = obj.length; i < length; i++) {
      count = 0;
      for (j in obj[i]) {
        for(k = 0; k < proLength; k++) {
          if (j === keys[k] && obj[i][j] === properties[keys[k]]) {
            count++;
          }
        }
      }

      if (count === proLength) {
        result.push(obj[i]);
      }
    }

    return result;
  };

  // var listOfPlays = [
  //   {a: 12, b: 'as', c: 32},
  //   {a: 10, b: 'as', c: 32},
  //   {a: 12, b: 's', c: 20},
  // ];
  // var found = _.where(listOfPlays, {a: 12});
  // console.log(found);

  _.findWhere = function(obj, properties) {
    if (!(obj instanceof Array)) {
      return [];
    }

    if (!(properties instanceof Object)) {
      return obj;
    }

    var i, j, k,
        length,
        proLength,
        count,
        keys = [];

    for (var key in properties) {
      keys.push(key);
    }

    proLength = keys.length;

    for (i = 0, length = obj.length; i < length; i++) {
      count = 0;
      for (j in obj[i]) {
        for(k = 0; k < proLength; k++) {
          if (j === keys[k] && obj[i][j] === properties[keys[k]]) {
            count++;
          }
        }
      }

      if (count === proLength) {
        return obj[i];
      }
    }

    return undefined;
  };

  // var listOfPlays = [
  //   {a: 12, b: 'as', c: 32},
  //   {a: 10, b: 'as', c: 32},
  //   {a: 12, b: 's', c: 20},
  // ];
  // var found = _.findWhere(listOfPlays, {a: 12});
  // console.log(found);

  _.createSomeOrEvery = function(bool) {
    return function(obj, predicate) {
      var i, length;

      if (obj instanceof Array) {
        for (i = 0, length = obj.length; i < length; i++) {
          if (bool == ((predicate)
                ? predicate(obj[i], i, obj)
                : obj[i])) {
            return bool;
          }
        }
      } else {
        return !!obj;
      }

      return !bool;
    };
  };

  _.every = _.createSomeOrEvery(false);
  _.some = _.createSomeOrEvery(true);

  // console.log(_.every([true, 1, 'ad']));
  // console.log(_.some([true, 1, 'ad']));


  _.contains = function(obj, value, fromIndex) {
    fromIndex = fromIndex || 0;
    if (obj instanceof Array) {
      if (obj.indexOf(value, fromIndex) >= 0) {
        return true;
      }
    } else if (obj instanceof Object) {
      var i;
      for (i in obj) {
        if (obj[i] === value) {
          return true;
        }
      }
    }

    return false;
  };

  // var found = _.contains([12, 1, 2], 3);
  // console.log(found);


})();
