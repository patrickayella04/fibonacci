const express = require("express");
const router = express.Router();

const math = require("../math");
router.get("/", function (req, res, next) {
  if (req.query.fibonum) {
    // Calculate directly in this server
    res.render("fibonacci", {
      title: "Calculate Fibonacci numbers",
      fibonum: req.query.fibonum,
      fiboval: math.fibonacci(req.query.fibonum),
    });
  } else {
    res.render("fibonacci", {
      title: "Calculate Fibonacci numbers",
      fiboval: undefined,
    });
  }
});

module.exports = router;

//Because this is a 'GET' form, when the user clicks on the 'Submit' button, the brouser will issue an HTTP 'GET' mehtod to the '/fibonacci' URL. (See inside '/views/fibonacci.hbs' to examin form example). What distinguishes one 'GET' method on '/fibonacci' from another is whether the URL contains a query parameter named 'fibonum' which is short for (fibonacci number). When the user first enters the page, there is no 'fibonum' number and so there is nothing to caluculate. After the user has entered a number and clicked on 'Submit', there is a fibonum number and something to calculate.
