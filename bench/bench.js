var timeit = require("timeit-async");
var fs = require('fs');
var tokenize = require('../');
var through = require('through2');

var src = fs.readFileSync(__dirname + '/input.html');
var reps = 3;
var sets = 100
function write (row, enc, next) { next(); }

timeit(function (done){
    var t = tokenize();
    t.pipe(through.obj(write, done));
    t.end(src);
}, sets, reps,
function (timings) {
  console.log(
    "time spent in microseconds doing", reps ,"repetitions",
    "and", sets, "sets" 
    )
  console.log("minimum time spent:", Math.min.apply(Math, timings))
  console.log("maximum time spent:", Math.max.apply(Math, timings));
  console.log(
    "average time spent:",
    timings.reduce(function (a, b){ return a + b }) / sets
  );
});
