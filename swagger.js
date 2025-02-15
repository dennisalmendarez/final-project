const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "stores API",
        description: "API for managing stores.",
    },
    host: "final-project-cb6l.onrender.com",
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