const addIncidentReportQuery = "INSERT INTO incidents (incident_desc, city, country, date, weather_report) VALUES ($1, $2, $3, $4, $5)";
const getIncidentReportQuery = "SELECT * FROM incidents WHERE city = $1 AND (weather_report->'main'->>'temp_min')::numeric = $2 AND (weather_report->'main'->>'temp_max')::numeric = $3 AND (weather_report-> 'main' ->> 'humidity')::numeric = $4";
const searchIncidentReportQuery = "SELECT * FROM incidents WHERE country = $1";

module.exports = {
    addIncidentReportQuery,
    getIncidentReportQuery,
    searchIncidentReportQuery
};