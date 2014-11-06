A simple “Hello World” example of using the WAMP protocol *using only NodeJS*: [AutobahnJS](https://github.com/tavendo/AutobahnJS) as the client library and, crucially, [wamp.rt](https://github.com/Orange-OpenSource/wamp.rt) as the WAMP router.

Demostrates:
* publish and subscribe to events,
* register and call remote prodedures.

Usage
-----

The wamp.rt router must be installed before use:

```sh
git submodule init
git submodule update
cd wamp.rt
npm install
```

Then:

```sh
npm start
```
