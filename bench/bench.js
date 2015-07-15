var fs = require('fs');
var tokenize = require('../');
var through = require('through2');

var src = fs.readFileSync(__dirname + '/input.html');
var times = 1000;

(function perf (n, run_times) {
    var start = process.hrtime();
    if (n === times) {
        run_times.sort(function (a, b) {
          return a - b;
        });
        var fastest = run_times[0];
        console.log(fastest + ' nanoseconds');
        return;
    }
    var t = tokenize();
    t.pipe(through.obj(write, end));
    t.end(src);
    
    function write (row, enc, next) { next() }
    function end () {
        run_times.push(process.hrtime(start)[1]);
        perf(n + 1, run_times);
    }
})(0, []);
