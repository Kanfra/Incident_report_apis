const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'development.env')
});
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });
  
  (async()=>{
    try{
        await pool.connect();
        console.log('database connected successfully');
    }catch(e){
            console.log(e.message);
        }});

  module.exports = pool;