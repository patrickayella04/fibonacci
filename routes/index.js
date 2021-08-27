var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Welcome to the Fibonacci Calculator" });
});

router.get("/error", function (req, res, next) {
  next({
    status: 404,
    message: "Fake error",
  });
  // This is a route handler in action which simply generates an erro indication at this router '/error'. In an actual real route handler, the code would make some kind of query, gathering up data to show to the user, and it would indicate an error only if something happend along the way.
  // By calling 'next(err)' or in this case...
  //next({
  // status: 404,
  // message: 'Fake error'
  //})
  // ...Express will call the error handler function, causing an error response to pop up in the browser. Indeed, at the './error' URL, we get the 'Fake error' message, which matches the error data sent by the route handler function.
});

module.exports = router;
