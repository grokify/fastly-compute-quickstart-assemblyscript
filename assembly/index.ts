//! Hello, World! Quickstart for AssemblyScript
import { Request, Response, Headers, URL, Fastly } from "@fastly/as-compute";

// The entry point for your application.
//
// Use this function to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

function main(req: Request): Response {
    let url = new URL(req.url);
    let logEndpoint = Fastly.getLogEndpoint("QuickstartLog");

    // If request is to the `/quickstart` path...
    if (req.method == "POST" && url.pathname == "/quickstart") {
        let headers = new Headers();
        headers.set('Content-Type', 'application/json; charset=utf-8');
        logEndpoint.log("assemblyscript quickstart responded with 200");
        return new Response(String.UTF8.encode('{"foo":"bar","hello":"world","lang":"assemblyscript","ping":"pong"}\n'), {
            status: 200,
            headers,
            url: null
        });
    }

    // Catch all other requests and return a 404.
    logEndpoint.log("assemblyscript quickstart responded with 404");
    return new Response(String.UTF8.encode("The page you requested could not be found"), {
        status: 404,
        headers: null,
        url: null
    });
}

// Get the request from the client.
let req = Fastly.getClientRequest();

// Pass the request to the main request handler function.
let resp = main(req);

// Send the response back to the client.
Fastly.respondWith(resp);

// Send the constructed response, and return
Fastly.respondWith(resp);
