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

  // TODO _invoke(list, methodName, *arguments)

  _.pluck = function(obj, propertyName) {
    if (obj instanceof Object) {
      var i, length,
          result = [];
      for (i = 0, length = obj.length; i < length; i++) {
        result.push(obj[i][propertyName]);
      }

      return result;
    }

    return [];
  };

  // var stooges = [
  //   {name: 'moe', age: 40},
  //   {name: 'larry', age: 50},
  //   {name: 'curly', age: 60}
  // ];
  // console.log(_.pluck(stooges, 'age'));

  _.createMaxOrMin = function(isMax) {
    var cmp;
    if (isMax) {
      cmp = function(a, b) {
        return a < b;
      };
    } else {
      cmp = function(a, b) {
        return a > b;
      };
    }

    return  function(obj, iteratee) {
      if (obj instanceof Array) {
        var length = obj.length;

        if (length === 0) {
          return -Infinity;
        }

        var i, result = obj[0];

        for (i = 1; i < length; i++) {
          if ((iteratee)
              ? cmp(iteratee(result), iteratee(obj[i]))
              : cmp(result, obj[i])) {
            result = obj[i];
          }
        }
        return result;
      }

      return obj;
    };
  };

  _.max = _.createMaxOrMin(true);
  _.min = _.createMaxOrMin(false);

  // var stooges = [
  //   {name: 'moe', age: 40},
  //   {name: 'larry', age: 50},
  //   {name: 'curly', age: 60}
  // ];
  // console.log(_.max(stooges, function(stooge){ return stooge.age; }));

  // var numbers = [10, 5, 100, 2, 1000];
  // console.log(_.min(numbers));


  _.sortBy = function(obj, iteratee) {
    if (obj instanceof Array) {
      if (iteratee instanceof Function) {
        return obj.sort(function(a, b) {
          return iteratee(a) - iteratee(b);
        });
      }
      if ((typeof iteratee) === 'string') {
        console.log('String');
        return obj.sort(function(a, b) {
          a = a[iteratee];
          b = b[iteratee];
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        });
      }
    }

    return [];
  };

  // console.log(_.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); }));
  // var stooges = [
  //   {name: 'moe', age: 40},
  //   {name: 'curly', age: 60},
  //   {name: 'larry', age: 50}
  // ];
  // console.log(_.sortBy(stooges, 'name'));


  _.groupBy = function(obj, iteratee) {
    if (obj instanceof Array) {
      var result = {},
          i,
          length = obj.length,
          groupName;

      if (iteratee instanceof Function) {
        for (i = 0; i < length; i++) {
          groupName = iteratee(obj[i], i, obj);
          if (!(result[groupName])) {
            result[groupName] = [];
          }
          result[groupName].push(obj[i]);
        }
      } else if ((typeof iteratee) === 'string') {
        for (i = 0; i < length; i++) {
          groupName = obj[i][iteratee];
          if (!(result[groupName])) {
            result[groupName] = [];
          }
          result[groupName].push(obj[i]);
        }
      }

      return result;
    }

    return {};
  };

  // console.log(_.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); }));
  // console.log(_.groupBy(['one', 'two', 'three'], 'length'));
  // var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
  // console.log(_.groupBy(stooges, 'age'));

  _.indexBy = function(obj, iteratee) {
    if (obj instanceof Array) {
      var i, length = obj.length,
          result = {};
      if (iteratee instanceof Function) {
        for (i = 0; i < length; i++) {
          result[iteratee(obj[i], i, obj)] = obj[i];
        }
      } else if ((typeof iteratee) === 'string') {
        for (i = 0; i < length; i++) {
          result[obj[i][iteratee]] = obj[i];
        }
      }

      return result;
    }

    return {};
  };


  // var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
  // console.log(_.indexBy(stooges, 'name'));


  _.countBy = function(obj, iteratee) {
    if (obj instanceof Array) {
      var i, length = obj.length,
          result = {},
          countName;
      for (i = 0; i < length; i++) {
        countName = iteratee(obj[i], i, obj);
        if (!(result[countName])) {
          result[countName] = 0;
        }
        result[countName]++;
      }
      return result;
    }
    return {};
  };

  // console.log(_.countBy([1, 2, 3, 4, 5], function(num) {
  //   return num % 2 === 0 ? 'even': 'odd';
  // }));


  _.shuffle = function(obj) {
    if (obj instanceof Array) {
      var i, j,
          tmp,
          floor = Math.floor,
          random = Math.random,
          result = obj.concat();
      for (i = result.length - 1; i >= 0; i--) {
        j = floor((random() * i));
        tmp = result[i];
        result[i] = result[j];
        result[j] = tmp;
      }

      return result;
    }

    return obj;
  };

  // console.log(_.shuffle([1, 2, 3, 4, 5, 6]));


  _.sample = function(obj, n) {
    if (obj instanceof Array) {
      n = n || 1;
      if (n === 1) {
        return obj[Math.floor(Math.random() * (obj.length - 1))];
      }
      if (n > 1) {
        var i,
            floor = Math.floor,
            random = Math.random,
            length = obj.length,
            tmp = obj.concat(),
            result = [];
        while (n > 0) {
          i = floor(random() * --length);
          result.push(tmp.splice(i, 1)[0]);
          n--;
        }
        return result;
      }
    }

    return obj;
  };

  // console.log(_.sample([1, 2, 3, 4, 5, 6]));
  // console.log(_.sample([1, 2, 3, 4, 5, 6], 3));


  _.toArray = function(obj) {
    if (obj instanceof Array) {
      return obj;
    }

    if (obj instanceof Object) {
      var i, result = [];
      for (i in obj) {
        result.push(obj[i]);
      }

      return result;
    }

    return obj ? [obj] : undefined;
  };

  // console.log((function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4));



  _.size = function(obj) {
    if (obj instanceof Array) {
      return obj.length;
    }

    if (obj instanceof Object) {
      var i, result = 0;
      for (i in obj) {
        result++;
      }

      return result;
    }

    return (obj) ? 1 : 0;
  };

  // console.log(_.size({one: 1, two: 2, three: 3}));


  _.partition = function(obj, predicate) {
    if (obj instanceof Array) {
      var dissatisfy = [],
          satisy = [],
          i, length = obj.length;

      for (i = 0; i < length; i++) {
        if (predicate(obj[i], i, obj)) {
          satisy.push(obj[i]);
        } else {
          dissatisfy.push(obj[i]);
        }
      }

      return [satisy, dissatisfy];
    }

    return obj;
  };

  // console.log(_.partition([0, 1, 2, 3, 4, 5],
  //                         function(a) { return a % 2 === 0; }));


  _.first = function(array, n) {
    if (array instanceof Array) {
      if (typeof(n) === 'undefined') {
        return array[0];
      }
      return array.slice(0, n);
    }

    return array;
  };

  // var a = [5, 4, 3, 2, 1];
  // console.log(_.first(a, 3));

  _.initial = function(array, n) {
    if (array instanceof Array) {
      n = n || 0;
      return array.slice(0, array.length - n);
    }

    return array;
  };

  // console.log(_.initial([5, 4, 3, 2, 1], 3));

  _.last = function(array, n) {
    if (array instanceof Array) {
      var length = array.length;
      if (typeof n === 'undefined') {
        return array[length - 1];
      }
      return array.slice(length - n, length);
    }

    return array;
  };

  // console.log(_.last([5,4,3,2,1]));

  _.rest = function(array, index) {
    if (array instanceof Array) {
      if (typeof index === 'undefined') {
        return array.slice(1);
      }
      return array.slice(index);
    }

    return array;
  };

  // console.log(_.rest([5, 4, 3, 2, 1]));

  _.compact = function(array) {
    if (array instanceof Array) {
      var i, j,
          length = array.length,
          result = array.concat();
      for (i = 0, j = 0; i < length; i++, j++) {
        if (!(result[j])) {
          result.splice(j--, 1);
        }
      }

      return result;
    }

    return array;
  };

  // console.log(_.compact([0, 1, false, 2, '', 3]));

  var flattener = function(array, result) {
    if (array instanceof Array) {
      for (var i = 0, length = array.length; i < length; i++) {
        arguments.callee(array[i], result);
      }
    } else {
      result.push(array);
    }
  };

  _.flatten = function(array, shallow) {
    if (array instanceof Array) {
      var result = [];
      if (typeof shallow === 'undefined') {
        flattener(array, result);
      } else if (shallow === true) {
        var i, length = array.length;
        for (i = 0; i <length; i++) {
          result = result.concat(array[i]);
        }
      }
      return result;
    }
    return array;
  };

  // console.log(_.flatten([1, [2], [3, [[4]]]], true));

  _.without = function(array, values) {
    var argLength = arguments.length;
    if (array instanceof Array &&
        argLength > 1) {
      var i, index = array.length,
          result = array.concat();
      while (index-- >= 0) {
        for (i = 1; i < argLength; i++) {
          if (result[index] === arguments[i]) {
            result.splice(index, 1);
          }
        }
      }

      return result;
    }

    return array;
  };

  // console.log(_.without([1, 2, 1, 0, 3, 1, 4], 0, 1));


  _.union = function(arrays) {
    var argLength = arguments.length;
    if (argLength < 1) {
      return [];
    }

    var i, j, length,
        result = [];
    if (arguments[0] instanceof Array) {
      result = arguments[0].concat();
    } else {
      result.push(arguments[0]);
    }

    for (i = 1; i < argLength; i++) {
      if (arguments[i] instanceof Array) {
        length = arguments[i].length;
        for (j = 0; j < length; j++) {
          if (result.indexOf(arguments[i][j]) === -1) {
            result.push(arguments[i][j]);
          }
        }
      } else {
        result.push(arguments[i]);
      }
    }

    return result;
  };

  // console.log(_.union([1, 2, 3], [101, 2, 1, 10], [2, 1, 12]));

  _.intersection = function(arrays) {
    var argLength = arguments.length;
    if (argLength < 1) {
      return [];
    }

    var i, j, length,
        result = [],
        tmp;
    if (arguments[0] instanceof Array) {
      result = arguments[0].concat();
    } else {
      result.push(arguments[0]);
    }

    for (i = 1; i < argLength; i++) {
      length = result.length;
      if (length === 0) {
        return [];
      }

      if (arguments[i] instanceof Array) {
        tmp = [];
        for (j = 0; j < length; j++) {
          if (arguments[i].indexOf(result[j]) > -1) {
            tmp.push(result[j]);
          }
        }
        result = tmp;
      } else {
        if (result.indexOf(arguments[i]) > -1) {
          result = [arguments[i]];
        }
      }
    }

    return result;
  };

  // console.log(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]));
  // console.log(_.intersection([1, 2, 3], [1], [2, 1]));

  _.difference = function(array, others) {
    if (array instanceof Array && others !== void 0) {
      var i,
          result = array.concat(),
          length = others.length,
          index = array.length;
      while (index-- >= 0) {
        for (i = 0; i < length; i++) {
          if (result[index] === others[i]) {
            result.splice(index, 1);
          }
        }
      }

      return result;
    }

    return array;
  };

  // console.log(_.difference([1, 2, 3, 4, 5], [5, 2, 10]));

  _.uniq = _.unique = function(array, isSorted) {
    if (array instanceof Array) {
      var i, j, length = array.length,
          result = [];
      if (isSorted === true) {
        result.push(array[0]);
        for (i = 1, j = 0; i < length; i++) {
          if (array[i] !== result[j]) {
            result.push(array[i]);
            j++;
          }
        }
        return result;
      }

      for (i = 0; i < length; i++) {
        if (result.indexOf(array[i]) === -1) {
          result.push(array[i]);
        }
      }
      return result;
    }

    return array;
  };

  // console.log(_.uniq([1, 2, 1, 3, 1, 4]));

  _.zip = _.unzip= function(arrays) {
    var i, j, ArgLength = arguments.length,
        length,
        result = [];

    if (!(arguments[0] instanceof Array)) {
      return [];
    }

    for (i = 0, length = arguments[0].length; i < length; i++) {
      result[i] = [arguments[0][i]];
    }

    for (i = 1; i < ArgLength; i++) {
      if (arguments[i] instanceof Array) {
        for (j = 0, length = arguments[i].length; j < length; j++) {
          result[j].push(arguments[i][j]);
        }
      }
    }

    return result;
  };

  // console.log(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]));

  _.object = function(obj, values) {
    if (!(obj instanceof Array)) {
      return obj;
    }

    var i, length = obj.length,
        result = {};

    if (!(values instanceof Array)) {
      for (i = 0; i < length; i++) {
        result[obj[i][0]] = obj[i][1];
      }

      return result;
    }

    for (i = 0; i < length; i++) {
      result[obj[i]] = values[i];
    }

    return result;
  };

  // console.log(_.object(['moe', 'larry', 'curly'], [30, 40, 50]));
  // console.log(_.object([['moe', 30], ['larry', 40], ['curly', 50]]));


  _.indexOf = function(array, value, isSorted) {
    if (!(array instanceof Array)) {
      throw TypeError(array + " is't a Array.");
    }

    // if (Array.prototype.hasOwnProperty('indexOf')) {
    //   return array.indexOf(value);
    // }

    var i = 0, length = array.length;

    if (isSorted) {
      var j = length - 1,
          floor = Math.floor,
          result;

      while (i <= j) {
        result = floor((i + j) / 2);
        console.log(result);
        if (array[result] === value) {
          return result;
        }

        if (array[result] > value) {
          j = result - 1;
        } else if (array[result] < value) {
          i = result + 1;
        }
      }
      return -1;
    }

    for (i = 0; i < length; i++) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };

  // console.log(_.indexOf([0, 1, 2, 3], 3, true));

  _.lastIndexOf = function(array, value, fromIndex) {
    if (!(array instanceof Array)) {
      throw TypeError(array + "is't a Array");
    }

    if (!(Array.prototype.hasOwnProperty('lastIndexOf'))) {
      return array.lastIndexOf(value, fromIndex);
    }

    for (var i = array.length - 1; i > 0; i--) {
      if (array[i] === value) {
        return i;
      }
    }

    return -1;
  };

  // console.log(_.lastIndexOf([1, 2, 3, 1, 2, 3], 2));

  _.sortedIndex = function(list, value, iteratee) {
    if (!(list instanceof Array)) {
      throw TypeError(list);
    }

    if (value === void 0) {
      return -1;
    }

    var i = 0,
        j = list.length - 1,
        floor = Math.floor,
        result = 0,
        curValue;

    var createCur = (function() {
      if (typeof iteratee === 'function') {
        value = iteratee(value);
        return function(i) {
          return iteratee(list[i], i, list);
        };
      }
      if (typeof iteratee === 'string') {
        value = value[iteratee];
        return function(i) {
          return list[i][iteratee];
        };
      }
      return function(i) {
        return list[i];
      };
    })();

    while (i <= j) {
      result = floor((i + j) / 2);
      curValue = createCur(result);
      console.log(curValue);
      if (curValue === value) {
        return result;
      }
      if (curValue > value) {
        j = result - 1;
      } else if (curValue < value) {
        i = result + 1;
      }
    }

    return i;
  };

  // console.log(_.sortedIndex([10, 20, 30, 40, 50], 35));
  // var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
  // console.log(_.sortedIndex(stooges, {name: 'larry', age: 50}, 'age'));

  _.findIndex = function(array, predicate) {
    if (array instanceof Array) {
      if (typeof predicate !== 'function') {
        throw TypeError();
      }

      for (var i = 0, length = array.length; i < length; i++) {
        if (predicate(array[i], i, array) === true) {
          return i;
        }
      }
    }

    return -1;
  };

  // console.log(_.findIndex([4, 6, 8, 1, 12], function(i){ return i % 2 === 1; }));

  _.findLastIndex = function(array, predicate) {
    if (array instanceof Array) {
      if (typeof predicate !== 'function') {
        throw TypeError();
      }

      for (var i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i], i, array) === true) {
          return i;
        }
      }
    }

    return -1;
  };


  _.range = function(start, stop, step) {
    var i, argLength = arguments.length,
        result = [];

    if (argLength === 1) {
      stop = start;
      start = 0;
    }

    step = (step !== void 0) ? step : 1;

    for (i = start; (i - stop) * step < 0; i += step) {
      result.push(i);
    }

    return result;
  };

  // console.log(_.range(10));
  // console.log(_.range(1, 11));
  // console.log(_.range(0, 30, 5));
  // console.log(_.range(0, -10, -1));
  // console.log(_.range(0));


  // TODO Function  _.bind  to  compose


  _.keys = function(obj) {
    if (!(obj instanceof Object)) {
      return [];
    }

    if (Object.prototype.keys) {
      return Object.prototype.keys(obj);
    }

    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    return keys;
  };

  // console.log(_.keys({one: 1, two: 2, three: 3}));

  _.allKeys = function(obj) {
    if (!(obj instanceof Object)) {
      return [];
    }

    var keys = [];
    for (var key in obj) {
      keys.push(key);
    }

    return keys;
  };

  // function Stooge(name) {
  //   this.name = name;
  // }
  // Stooge.prototype.silly = true;
  // console.log(_.allKeys(new Stooge("Moe")));


  _.values = function(obj) {
    if (!(obj instanceof Object)) {
      return [];
    }

    var values = [];
    for (var value in obj) {
      values.push(obj[value]);
    }

    return values;
  };

  // console.log(_.values({one: 1, two: 2, three: 3}));

  _.mapObject = function(obj, iteratee) {
    if (!(obj instanceof Object)) {
      return {};
    }

    if (typeof iteratee !== 'function' &&
        iteratee === void 0) {
      return {};
    }

    var result = {};
    for (var key in obj) {
      result[key] = iteratee(obj[key], key);
    }

    return result;
  };

  // console.log(_.mapObject({start: 5, end: 12}, function(val, key) {
  //   return val + 5;
  // }));


  _.pairs = function(obj) {
    if (!(obj instanceof Object)) {
      return [];
    }

    var result = [];
    for (var key in obj) {
      result.push([key, obj[key]]);
    }

    return result;
  };

  // console.log(_.pairs({one: 1, two: 2, three: 3}));

  _.invert = function(obj) {
    if (!(obj instanceof Object)) {
      return {};
    }

    var result = {};
    for (var key in obj) {
      result[obj[key]] = key;
    }

    return result;
  };

  // console.log(_.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}));


  _.create = function(prototype, props) {
    if (!(prototype instanceof Object)) {
      return {};
    }


    if (Object.create) {
      return Object.create(prototype, props);
    }

    var Ctor = function(){};
    Ctor.prototype = prototype;
    var result = new Ctor();

    if (props instanceof Object) {
      for (var key in props) {
        result[key] = props[key];
      }
    }

    return result;
  };

  // function Stooge() {
  //   this.a = 1;
  //   this.b = 2;
  //   this.getA = function() {
  //     return this.a;
  //   };
  // }

  // Stooge.prototype.x = 12;
  // Stooge.prototype.y = 34;
  // Stooge.prototype.getX = function() {
  //   return this.x;
  // };

  // var moe = _.create(Stooge.prototype, {name: 'lm'});

  // console.log(moe.x);


  _.functions = function(obj) {
    if (!(obj instanceof Object)) {
      return [];
    }

    var key,
        result = [];
    for (key in obj) {
      if (typeof obj[key] === 'function') {
        result.push(key);
      }
    }

    return result;
  };

  // console.log(_.functions(_));

  _.findKey = function(obj, predicate) {
    if (!(obj instanceof Object)) {
      return undefined;
    }

    if (typeof predicate === 'string') {
      return obj[predicate] || undefined;
    }

    if (typeof predicate === 'function') {
      for (var key in obj) {
        if (predicate(obj[key], key, obj)) {
          return key;
        }
      }
    }

    return undefined;
  };

  _.extend = function(destination, sources) {
    if (!(destination instanceof Object)) {
      return {};
    }

    var i, key,
        argLength = arguments.length;
    for (i = 1; i < argLength; i++) {
      if (arguments[i] instanceof Object) {
        for (key in arguments[i]) {
          destination[key] = arguments[i][key];
        }
      }
    }

    return destination;
  };

  // console.log(_.extend({name: 'moe'}, {age: 50}));

  _.extendOwn = function(destination, sources) {
    if (!(destination instanceof Object)) {
      return {};
    }

    var i, key,
        argLength = arguments.length;
    for (i = 1; i < argLength; i++) {
      if (arguments[i] instanceof Object) {
        for (key in arguments[i]) {
          if (destination[key] && destination.hasOwnProperty(key)) {
            destination[key] = arguments[i][key];
          }
        }
      }
    }

    return destination;
  };

  _.pick = function(obj, keys) {
    if (!(obj instanceof Object)) {
      return {};
    }

    var key,
        result = {};
    if (typeof keys === 'function') {
      for (key in obj) {
        if (keys(obj[key], key, obj)) {
          result[key] = obj[key];
        }
      }
      return result;
    }

    var item,
        argLength = arguments.length;
    for (var i = 1; i < argLength; i++) {
      item = obj[arguments[i]];
      if (item) {
        result[arguments[i]] = item;
      }
    }
    return result;
  };

  // console.log(_.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));
  // console.log(_.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  //   return value === 50;
  // }));

  _.omit = function(obj, keys) {
    if (!(obj instanceof Object)) {
      return {};
    }

    var key,
        result = {};
    if (typeof keys === 'function') {
      for (key in obj) {
        if (!keys(obj[key], key, obj)) {
          result[key] = obj[key];
        }
      }
      return result;
    }

    var argLength = arguments.length;
    for (key in obj) {
      for (var i = 1; i < argLength; i++) {
        if (key !== arguments[i]) {
          result[key] = obj[key];
        }
      }
    }
    return result;
  };

  // console.log(_.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid'));
  // console.log(_.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
  //   return value === 50;
  // }));


  _.defaults = function(obj, defaults) {
    if (!(obj instanceof Object)) {
      return {};
    }

    var argLength = arguments.length;
    for (var i = 1; i < argLength; i++) {
      if (arguments[i] instanceof Object) {
        for (var key in arguments[i]) {
          obj[key] = obj[key] || arguments[i][key];
        }
      }
    }

    return obj;
  };

  // var iceCream = {flavor: "chocolate"};
  // console.log(_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"}));

  _.clone = function(obj) {
    if (!(obj instanceof Object)) {
      return {};
    }

    var result = {};
    for (var key in obj) {
      result[key] = obj[key];
    }

    return result;
  };

  // console.log(_.clone({name: 'moe'}));

  // TODO _.tap = function(obj, interceptor) {};

  _.has = function(obj, key) {
    if (!(obj instanceof Object)) {
      return false;
    }

    return obj.hasOwnProperty(key);
  };

  // console.log(_.has({a: 1, b: 2, c: 3}, "b"));

  _.property = function(key) {
    if (typeof key === 'string') {
      return function(obj) {
        if (obj instanceof Object) {
          return obj[key];
        }
        throw TypeError();
      };
    }
    throw TypeError();
  };

  // var stooge = {name: 'moe'};
  // console.log('moe' === _.property('name')(stooge));

  _.propertyOf = function(obj) {
    if (!(obj instanceof Object)) {
      throw TypeError();
    }

    return function(key) {
      if (typeof key === 'string') {
        return obj[key];
      }
      throw TypeError();
    };
  };

  // var stooge = {name: 'moe'};
  // console.log(_.propertyOf(stooge)('name'));

  // TODO _.matcher = function(attrs) {};

  _.isEqual = function(obj, other) {
    if (obj instanceof Object && other instanceof Object) {
      // Object
      for (var key in obj) {
        if (arguments.callee(obj[key], other[key]) === false) {
          return false;
        }
      }
      return true;
    }
    if (obj instanceof Array && other instanceof Array) {
      // Array type
      for (var i = 0, length = obj.length; i < length; i++) {
        if (arguments.callee(obj[i], other[i]) === false) {
          return false;
        }
      }

      return true;
    }

    // basic type
    return obj === other;
  };


  // var stooge = {name: 'moe', luckyNumbers: [13, 27, {a:undefined}], a: {a:1,b:2}};
  // var clone  = {name: 'moe', luckyNumbers: [13, 27, {a:undefined}], a: {a:1,b:2}};
  // console.log(stooge == clone);
  // console.log(_.isEqual(stooge, clone));

  _.isMatch = function(obj, properties) {
    if (!(obj instanceof Object) || !(properties instanceof Object)) {
      return false;
    }

    for (var key in properties) {
      if (_.isEqual(properties[key], obj[key]) === false) {
        return false;
      }
    }

    return true;
  };

  // var stooge = {name: 'moe', age: 32};
  // console.log(_.isMatch(stooge, {age: 31}));

  _.isEmpty = function(obj) {
    if (obj instanceof Object) {
      for (var key in obj) {
        return false;
      }
    }

    if (obj instanceof Array ||
       typeof obj === 'string') {
      return obj.length === 0;
    }

    return true;
  };

  // console.log(_.isEmpty([1, 2, 3]));
  // console.log(_.isEmpty({a:undefined}));
  // console.log(_.isEmpty(1));


  // TODO _.isElement = function(obj) {  };

  _.isArray = function(obj) {
    return obj instanceof Array;
  };

  // console.log((function(){ return _.isArray(arguments); })());
  // console.log(_.isArray([1,2,3]));

  _.isObject = function(obj) {
    return obj instanceof Object;
  };

  // console.log(_.isObject(1));

  _.isArguments = function(obj) {
    return _.has(obj, 'callee');
  };

  // console.log((function(){ return _.isArguments(arguments); })(1, 2, 3));
  // console.log(_.isArguments([1,2,3]));

  _.isFunction = function(obj) {
    return typeof obj === 'function';
  };

  // console.log(_.isFunction(console.log));

  _.isString = function(obj) {
    return typeof obj === 'string';
  };

  _.isNumber = function(obj) {
    return typeof obj === 'number';
  };

  _.isFinite = function(obj) {
    return obj === Infinity || obj === -Infinity;
  };

  // console.log(_.isFinite(-Infinity));
  // console.log(_.isFinite(-1));

  _.isBoolean = function(obj) {
    return typeof obj === 'boolean';
  };

  // console.log(_.isBoolean(false));

  _.isDate = function(obj) {
    return toString.call(obj) === '[object Date]';
  };

  // console.log(_.isDate(new Date()));

  _.isRegExp = function(obj) {
    return toString.call(obj) === '[object RegExp]';
  };

  // console.log(_.isRegExp(/moe/));

  _.isError = function(obj) {
    return toString.call(obj) === '[object Error]';
  };

  _.isNaN = function(obj) {
    return isNaN(obj);
  };

  _.isNull = function(obj) {
    return obj === Null;
  };

  _.isUndefined = function(obj) {
    return obj === void 0;
  };
}.call(this));
