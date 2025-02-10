const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "stores API",
        description: "API for managing stores.",
    },
    host: "https://final-project-cb6l.onrender.com",
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);