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

// var listOfPlays = [
//   {a: 12, b: 'as', c: 32},
//   {a: 10, b: 'as', c: 32},
//   {a: 12, b: 's', c: 20},
// ];

// listOfPlays = {a: 12, b: 'as', c: 32};
// var found = _.contains(12);
// console.log(found);

// (function() {
//   console.log(123);
// }.call(this));

// console.log(_.initial([5, 4, 3, 2, 1], 3));
// console.log(_.last([5,4,3,2,1], 2));

// console.log(_.unzip([['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]]));

// var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
// console.log(Object.keys(an_obj)); // console: ['2', '7', '100']
// for (var i in an_obj) {
//   console.log(i);
// }


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

// // var moe = _.create(Stooge.prototype, {name: 'lm'});

// // console.log(moe.a);

// var s = new Stooge();

// for(var key in s) {
//   if (typeof s[key] === 'function') {
//     console.log(key);
//   }
// }

// console.log(_.functions(new Stooge()));

// var stooge = {name: 'moe', luckyNumbers: [13, 27, {a:1}], a: {a:1,b:2}};
// var clone  = {name: 'moe', luckyNumbers: [13, 27, {a:1}], a: {a:1,b:2}};
// console.log(stooge == clone);
// console.log(_.isEqual(stooge, clone));


console.log(_.isEmpty([]));
