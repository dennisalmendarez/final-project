const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "stores API",
        description: "API for managing stores.",
    },
    host: "cse-341-project-2-j6y0.onrender.com",
    schemes: ['https'],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        SessionAuth: {
            type: "apiKey",
            name: "Cookie",
            in: "header"
        }
    },
    security: [
        { SessionAuth: [] }
    ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);