const express = require("express");
const incidentReportController = require("../controller/incidentReportController");
const incidentReportRouter = express.Router();

// Post incident report
incidentReportRouter.post("/post-incident-report", incidentReportController.postIncidentReport);
incidentReportRouter.get("/get-incident-report/:city/:tempRange/:humidityRange", incidentReportController.getIncidentReport);
incidentReportRouter.post("/search-incident-report", incidentReportController.searchIncidentReport);



module.exports = incidentReportRouter;