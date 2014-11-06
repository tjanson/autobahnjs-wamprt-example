A simple “Hello World” example of using the WAMP protocol *using only NodeJS*: [AutobahnJS](https://github.com/tavendo/AutobahnJS) as the client library and, crucially, [wamp.rt](https://github.com/Orange-OpenSource/wamp.rt) as the WAMP router.

Demostrates:
* publish and subscribe to events,
* register and call remote prodedures.

Install
-------

Run `npm install` to install the two dependencies.

Usage
-----

Running `npm start` should start the wamp.rt example server and execute the Hello World app. If that doesn’t work, start the server manually with `node server.js`, and the app with `node helloworld.js`.
