# dev-proxy

a ~ 20 LOC reverse-proxy server (based on http-proxy) to assits the front-end developer in these use-cases:

1. Simulate and Mock data while working on a UI feature. (without god forbid modifying the application code and forgetting it there)
2. Start working on a feature way before the backend dudes have given you something.
3. (Future) Working on a local version of the application while connecting to test/staging/prod backend, without messing with CORS. 

This proxy will let you override some responses for specific paths, while proxying all other requests to the real origin server.

Look at the config.json file to understand how to provide custom routes, and configure the origin server and ports.