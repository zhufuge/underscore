var _ = require('underscore');

// _.each([1, 2, 3], console.log);
// _.each({one: 1, two: 2, three: 3}, console.log);

// console.log(_.map([1, 2, 3], function(num) {return num * 3;}));
// console.log(_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }));

// var sum = _.reduce(['12', 2, 3], function(a, b) {return a + b;});
// console.log(sum);

// var even = _.filter([1, 2, 3, 5, 9, 10], function(num){ return num % 2 === 0; });
// console.log(even);

// var listOfPlays = [
//   {a: 12, b: 'as', c: 32},
//   {a: 10, b: 'as', c: 32},
//   {a: 12, b: 's', c: 20},
// ];

//var listOfPlays = [123, 12, 23, 123];

// var listOfPlays = {a:12, b:'s'};

var listOfPlays = [
  {a: 12, b: 'as', c: 32},
  {a: 10, b: 'as', c: 32},
  {a: 12, b: 's', c: 20},
];

listOfPlays = {a: 12, b: 'as', c: 32};
var found = _.contains(12);
console.log(found);

(function() {
  console.log(123);
}.call(this));
