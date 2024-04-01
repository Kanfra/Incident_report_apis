const request = require("request");
const path = require("path");
require("dotenv").config({
    override: true,
    path: path.join(__dirname, 'development.env')
});
const pool = require("../db");
const incidentReportQueries = require("../queries/incidentReportQueries");

// Task 1
const postIncidentReport = async (req, res) => {
    const { incident_desc, city, country } = req.body;
    const unixTimestamp = 1711791420978; // Your Unix timestamp
    const formattedDate = new Date(unixTimestamp);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = formattedDate.getDate();
    const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    let weather_report = null;
    const WEATHERAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${process.env.WEATHERAPIKEY}`;
    //take weather_report data from api
        request(WEATHERAPIURL, (error, response, body) => {
            if(error) res.status(400).json({error: `${error.message}`});
            else{
                const data = JSON.parse(body);
                weather_report = JSON.stringify(data);
                postQuery(incident_desc, city, country, date, weather_report);
                
            }
       });

   async function postQuery(incident_desc, city, country, date, weather_report){
    await pool.query(incidentReportQueries.addIncidentReportQuery, [ incident_desc, city, country, date, weather_report ], (error, results) => {
        if(error) res.status(400).json(`error message: ${error.message}`);
        else{
            res.json("Data has been successfully saved");
        }
    });
   }     
}

// Task 2
const getIncidentReport = async (req, res) => {
    try{
    const city = req.params.city;
    const temp_range = req.params.tempRange;
    const humidity_range = req.params.humidityRange;
    const [ temp_min, temp_max ] = temp_range.split('-').map(Number); 
    const finalResult  = await pool.query(incidentReportQueries.getIncidentReportQuery, [city, temp_min, temp_max, humidity_range]);
    console.log("Data extracted successfully");
    res.json(finalResult.rows);
    }catch(e){
        res.status(500).json({error: `${e.message}`});
    }
}

// Task 3
const searchIncidentReport = async (req, res) => {
    try{
        const { country } = req.body;
        const result = await pool.query(incidentReportQueries.searchIncidentReportQuery, [country]);
        res.json(result.rows);
    }catch(e){
        res.status(500).json({error: e.message});
    }

}

module.exports = {
    postIncidentReport,
    getIncidentReport,
    searchIncidentReport
};