const serverless = require('serverless-http');
// esbuild will transpile the ESM defaults from index.js into a CJS-compatible require
const appModule = require('../../server/index.js');
const app = appModule.default || appModule;

exports.handler = serverless(app);
