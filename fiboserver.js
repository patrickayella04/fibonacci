// This is a stripped-down Express application that gets right to the point of providing a Fibonacci calculation service.
// The one route it supports handles the Fibonacci computation using the same functions that we've already worked with.
// This is the first time we've seen res.send used. It's a flexible way to send responses that can take an array of header
// values (for the HTTP response header) and an HTTP status code. As used here, it automatically detects the object, formats it as JSON text,
// and sends it with the correct Content-Type parameter.

const math = require("./math");
const express = require("express");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.get("/fibonacci/:n", (req, res, next) => {
  math.fibonacciAsync(Math.floor(req.params.n), (err, val) => {
    if (err) next(`FIBO SERVER ERROR ${err}`);
    else {
      res.send({
        n: req.params.n,
        result: val,
      });
    }
  });
});
app.listen(process.env.SERVERPORT);

// Now we add the following scripts in package.json : "server": "SERVERPORT=3002 node ./fiboserver"
// Then call npm run server
// Then in a seperate command window, we can use the curl program to make some requests against this service:
// $ curl -f http://localhost:3002/fibonaci/10
// {"n":"10","result":55}
