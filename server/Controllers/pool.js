const mysql = require("mysql")
const config = require("../../config")

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    port: config.DB_PORT,
    database: config.DB_NAME
})

module.exports = pool