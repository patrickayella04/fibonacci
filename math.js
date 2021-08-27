exports.fibonacci = function (n) {
  if (n === 0) return 0;
  else if (n === 1 || n === 2) return 1;
  else return exports.fibonacci(n - 1) + exports.fibonacci(n - 2);
};
// This file, math.js, is at the top level of the directory and contains a simplistic Fibonacci implementation.

exports.fibonacciLoop = function (n) {
  var fibos = [];
  fibos[0] = 0;
  fibos[1] = 1;
  fibos[2] = 1;
  for (let i = 3; i <= n; i++) {
    fibos[i] = fibos[i - 2] + fibos[i - 1];
  }
  return fibos[n];
};

// Algorithmic refactoring: Perhaps, like the Fibonacci function we chose, the algorithm 'exports.fibonacci' is suboptimal and must be rewritten to be faster like in 'exports.fibonacciLoop'.
// Key Take Away: The discussion here isn't about optimizing mathematics libraries but about dealing with inefficent algorithms that affect event throughput in a Node.js server. For that reason, we will stick with the inefficient Fibonacci implementation.

// It is possible to divide the calculation into chunks and then dispatch the computation of those chunks through the event loop. see below:
module.exports.fibonacciAsync = function (n, done) {
  if (n === 0) done(undefined, 0);
  else if (n === 1 || n === 2) done(undefined, 1);
  else {
    setImmediate(() => {
      exports.fibonacciAsync(n - 1, (err, val1) => {
        if (err) done(err);
        else
          setImmediate(() => {
            exports.fibonacciAsync(n - 2, (err, val2) => {
              if (err) done(err);
              else done(undefined, val1 + val2);
            });
          });
      });
    });
  }
}; // This converts the fibonacci function from a synchronous function into a traditional callback-oriented asynchronous function. We're using "setImmediate()" at each stage of the calculation to ensure that the even loop executes regularly and that the server can easily handle other requests while churnning away on a calculation. It does nothing to reduce the computation required; this is still the inefficient Fibonacci algorithm. All we've done is spread the computation through the even loop.
