var _ = require('underscore');

// _.each([1, 2, 3], console.log);
// _.each({one: 1, two: 2, three: 3}, console.log);

// console.log(_.map([1, 2, 3], function(num) {return num * 3;}));
// console.log(_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }));

// var sum = _.reduce(['12', 2, 3], function(a, b) {return a + b;});
// console.log(sum);

var even = _.find([1, 3, 3, 5, 9], function(num){ return num % 2 == 0; });
console.log(even);
