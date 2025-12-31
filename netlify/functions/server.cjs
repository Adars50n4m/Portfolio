const serverless = require('serverless-http');

// Global handler cache
let serverlessHandler;

exports.handler = async (event, context) => {
    // Lazy load the ESM application
    if (!serverlessHandler) {
        // Use dynamic import for ESM compatibility
        const appModule = await import('../../server/index.js');
        const app = appModule.default || appModule;
        serverlessHandler = serverless(app);
    }

    // Invoke the handler
    return serverlessHandler(event, context);
};
