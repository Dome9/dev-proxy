# dev-proxy

a < 50 LOC reverse-proxy server (based on http-proxy) to assit the front-end developer in these use-cases:

1. Simple web server to serve your local files
2. Simulate and Mock data while working on a UI feature. (without god forbid modifying the application code and forgetting it there)
2. Start working on a feature way before the backend dudes have given you something.
3. Working on a local version of the application while connecting to test/staging/prod backend, without messing with CORS. 

This server will let you serve your local application file while proxying the backend requests to an origin server of your choice.
It will also allow you to override some responses for specific paths (so you could easily mimic some application cases / work with not-yet-created-api).

Take a look at the config.json file to understand how to provide custom routes, and configure the origin server and ports.

Instructions:
- git clone this repo
- add som data file and configure config.json
- npm update
- node index.js