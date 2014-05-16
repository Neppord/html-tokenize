var timeit = require("timeit-async");
var fs = require('fs');
var tokenize = require('../');
var through = require('through2');

var src = fs.readFileSync(__dirname + '/input.html');

function write (row, enc, next) { next(); }

timeit(function (done){
    var t = tokenize();
    t.pipe(through.obj(write, done));
    t.end(src);
}, 10, 10, console.log);
