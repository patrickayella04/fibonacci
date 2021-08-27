const createError = require("http-errors");
const hbs = require("hbs"); // Here we have explicityly imported the hbs module so that we could do some configuration.
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
//const fibonacciRouter = require("./routes/fibonacci"); // The 'routes/fibonacci.js module serves to query a number for which to calculate the Fibonacci number.

// New fibonacci router
const fibonacciRouter = require("./routes/fibonacci-async1");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// Files in the 'views' folder are templates (hbs) into which data is rendered. They serve the 'view' aspect of the Model-View-Controller (MVC) paradign, hence the directory ('__dirname') name.
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// The app.use function mounts middleware functions. Middleware functions are involved in processing requests and sending results to HTTP clients. Middleware functions have access to the request and response objects and are expected to process their data and perhaps add data to these objects. These (res & req) are the first of three arguments taken into the middleware functions. The last argument, next(), is a callback function that is required to pass control to the next  middleware function if there are multiple, &/or controls when the request-response cycle ends. It can also be used to send errors down the middleware pipeline by calling next(err). The overall architecture is set up so that incoming requests are handled by zero or more middleware functions, followed by a router function, which sends the response.

// Instead of calling next(), some functions will call...for example
//app.get('/hello', function(req, res){
//    res.send('Hello World!')
//})
// ...res.send or res.render. The HTTP response is sent for certain functions on the response object, as res.send or res.render. If neither next() nor res.send are called, the request never gets a response and the requesting client will hang.

// router functions
app.use("/", indexRouter);
app.use("/fibonacci", fibonacciRouter);
// The Router object is a middleware used explicitly for routing requests based on their URL. This - app.use("/fibonacci", fibonacciRouter); - takes the 'router' object - (fibonacciRouter), with its zero-or-more router functions, and mounts it on the '/fibonacci' URL.  As Express looks for a matching routing function, it first scans the functions attached to the app object, and for any router object,  it scans its functions as well. It then invokes any routing functions that match the request.
// The fact that the router is 'mounted' on the '/fibonacci' URL is important. That's because the actual URL it considers matching is the mount point(/fibonacci) concatenated with the URL in the 'router' function.
//The effect is that the mount prefix is stripped from the request URL for the purpose of matching againts the 'router' functions attached to the 'router' object. So, with that mount point, an incoming URL of '/fibonacci/login' would be stripped to just /login in order to find a matching 'router' funciton.

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
}); // A middleware function indicates an error by passing a value to the 'next' function call, namely by calling 'next(err)'. Once Express sees the error, it skips over any remaining non-error routings and only passes the error to error handlers instead.

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error"); // The res.render function takes data and renders it through a template. In this cas, we're using the template named 'error'. This res.render('error') corresponds to the 'views/error.hbs' file. In Handlebars template, the value {{value}} markup means to substitute into the template the value of the xpression or variable. The values referenced by this template - 'message' and 'error' - are provided by setting 'res.locals' as shown above.
}); //

module.exports = app;
