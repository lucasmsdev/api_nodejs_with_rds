const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "<rds-endpoint>",
    user: "<rds-user>",
    password: "<rds-user-password>"
});

conn.connect(function (err) {
    if(err) throw err; //caso a conexão falhar
    
    conn.query("CREATE DATABASE IF NOT EXISTS rdsexample;")
    conn.query("USE rdsexample;")
});

module.exports = conn;