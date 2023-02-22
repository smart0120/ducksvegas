const getRides = require('express').Router();
const pool = require('./pool');

getRides.get("/raids", (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM rides`, (err, rows) => {
            connection.release();

            if(err) throw err;

            let data = JSON.stringify(rows);
            data = JSON.parse(data);

            res.status(200).json({
                status: "success",
                data
            })
        })
    })
})

module.exports = getRides;