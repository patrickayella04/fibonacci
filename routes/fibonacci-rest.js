const { response } = require("express");
const express = require("express");
const router = express.Router();
const http = require("http");
const math = require("../math");

router.get("/", function (req, res, next) {
  if (req.query.fibonum) {
    var httpreq = http.request({
      host: "localhost",
      port: process.env.SERVERPORT,
      path: `/fibonacci/${Math.floor(req.query.fibonum)}`,
      method: "GET",
    });

    httpreq.on("response", (response) => {
      response.on("data", (chunk) => {
        var data = JSON.parse(chunk);
        res.render("fibonacci", {
          title: "Calculate Fibonacci numbers",
          fibonum: req.query.fibonum,
          fiboval: data.result,
        });
      });

      response.on("error", (err) => {
        next(err);
      });
    });

    httpreq.on("error", (err) => {
      next(err);
    });
    httpreq.end();
  } else {
    res.render("fibonacci", {
      title: "Calculate Fibonacci numbers",
      fiboval: undefined,
    });
  }
});

module.exports = router;

/* 
This is a new variant of the Fibonacci route handler, this time calling the REST backend service. We've transplanted the
'http.request' call from 'fiboclient.js' and intgrated the events comming from the client object with the Express route handler. 
In the normal path of execution, the HTTPClient issues a response event, containing a response object. 
When that object issues a data event, we have our result. The result is JSON text, which we can parse and then return to the browser
as the response to its request. p186 
*/
