// Another wayto mitigate computationally intensive code is to push the calculation to the backend process.
// To explore that strategy, we'll request computations from a backend Fibonacci server, using the HTTPClient object to do so.
// However, before we look at that lets first talk about using the HTTPClient object.
// Node.js includes an HTTPCLient object, which is useful for making HTTP request.
//If has the capability to issue any kind of HTTP request. In this section, we'll use the HTTPClient object to make HTTP requests similar to call REST web serveices.

// Lets start with some code inspired by the wget or curl commands to make HTTP requests and show the results.

const http = require("http");
const url = require("url");
const util = require("util");

const argUrl = process.argv[2];
const parsedUrl = url.parse(argUrl, true);

// The options object is passed to http.request
// telling it the URL to retrieve
const options = {
  host: parsedUrl.hostname,
  port: parsedUrl.port,
  path: parsedUrl.pathname,
  method: "GET",
};

if (parsedUrl.search) options.path += `?${parsedUrl.search}`;

const req = http.request(options);
// Invoked when the request is finished
req.on("response", (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${util.inspect(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("error", (err) => {
    console.log(`RESPONSE ERROR: ${err}`);
  });
});
// Invoked on errors
req.on("error", (err) => {
  console.log(`REQUEST ERROR: ${err}`);
});
req.end();

// We invoke an HTTP request by using http.request, passing in an options object describing the request.
// In this case, we're making a GET request to the server described in a URL we provide on the command line.
// When the response arrives, the response event is fired and we can print out the response. Likewise, an error event is fired
// on errors, and we can print out the error.

// The options object is fairly straightforward, with the host, port, and path fields specifying the URL that is requested.
// The method field must be one of the HTTP verbs(GET, PUT, POST, and so on). You can also provide a headers array for the
// headersin the HTTP request.

// The next step in offloading some computation to a backend service is to implement the REST service and to make HTTP client
// requests to that service.
