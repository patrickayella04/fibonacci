/* REST stands for REpresentational State Transfer. REST is web standards based architecture and uses HTTP Protocol. It revolves around resource where every component is a resource and a resource is accessed by a common interface using HTTP standard methods. REST was first introduced by Roy Fielding in 2000.

A REST Server simply provides access to resources and REST client accesses and modifies the resources using HTTP protocol. Here each resource is identified by URIs/ global IDs. REST uses various representation to represent a resource like text, JSON, XML but JSON is the most popular one. */

// This is a simple client program, fiboclient.js, to programmatically call the Fibonacci service.
const http = require("http");
const paths = [
  "/fibonacci/30",
  "/fibonacci/20",
  "/fibonacci/10",
  "/fibonacci/9",
  "/fibonacci/8",
  "/fibonacci/7",
  "/fibonacci/6",
  "/fibonacci/5",
  "/fibonacci/4",
  "/fibonacci/3",
  "/fibonacci/2",
  "/fibonacci/1",
];
paths.map((path) => {
  console.log(`${new Date().toISOString()} requesting ${path}}`);
  var req = http.request(
    {
      host: "localhost",
      port: process.env.SERVERPORT,
      path,
      method: "GET",
    },
    (res) => {
      res.on("data", (chunk) => {
        console.log(`${new Date().toISOString()} BODY: ${chunk}`);
      });
    }
  );
  req.end();
});

// This is our good friend http.request with a suitable options object. We'er executing it in a loop, so pay attention to the order that the requests are made versus the order
// the response arrive.
// Then in package.json, add the following scripts section:
// "scripts": {
//     "start": "node ./bin/www",
//     "server": "SERVERPORT=3002 node ./fiboserver",
//      "client": "SERVERPORT=3002 node ./fiboclient"
//   },

// Then run the client app in the terminal npm run client.

// Conclusion
/*
We're building our way toward adding the REST service to the web application. 
At this point, we've proved several things, one of which is the ability to call a REST service in our program. 

We also in advertenly demonstrated an issue with long-running calculations. You'll notice that the requests were made from the largetst to the smallest, but the 
results appeard in a very different order. Why? This is because of the processing time required for each request, and the inefficent algorithm we're using. 
The computation time increases enough to ensure that larger request values have enouth processing time to reverse the order.

What happends is that 'fiboclient.js' sends all of its requests right away, and then each one waits for the response to arrive. Because the server is using 
fibonaccieAsync, it will work on calculationg all the responses simultaneously. The values that are quickest to calculate are the one that will be ready first. 
As the responses arrive in the client, the matching response handler fires, and in this case, the result prints to the console. The results will arrive
when they're ready, and not a millisecond sooner. 

We now have enough on our hands to offload Fibonacci calculation to a backend service. 
*/
