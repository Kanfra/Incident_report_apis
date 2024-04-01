// Importing packages
const express = require('express'); 
const incidentReportRouter = require('./routes/incidentReportRoute');
const path = require("path");
require("dotenv").config({
    override: true,
    path: path.join(__dirname, 'development.env')
});

//Initializations
const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1/reports", incidentReportRouter);


app.listen(process.env.SERVERPORT, "0.0.0.0", ()=> console.log(`Connected at port ${process.env.SERVERPORT}`)
);

