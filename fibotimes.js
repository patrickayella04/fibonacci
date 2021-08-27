// const math = require("./math");
// for (var num = 1; num < 80; num++) {
//   let now = new Date().toISOString();
//   console.log(`${now} Fibonacci for ${num} = ${math.fibonacci(num)}`); // This num went into the modual with the export nam 'exports.fibonacci' from the "./math.js file."
// }

// If you type $ fibotimes.js in the terminal this modual quickly calculates the first 40 or so something members of the Fibonacci sequuence, but after the 40th member, it starts taking a couple seconds per result and quickly degrades from there. It is untenable to execute code of this sort on a single-threaded system that relies on a quick return to the event loop. A web service containing code like this would give a poor performance to the users.

const math = require("./math");
for (var num = 1; num < 800; num++) {
  let now = new Date().toISOString();
  console.log(`${now} Fibonacci for ${num} = ${math.fibonacciLoop(num)}`); // This num went into the modual with the export name 'exports.fibonacciLoop' from the "./math.js file." The results are lightning quick! Through the use of Algorithmic refactoring.
}
