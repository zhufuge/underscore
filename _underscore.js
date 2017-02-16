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


})();

