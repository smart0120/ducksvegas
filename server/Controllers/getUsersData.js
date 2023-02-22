const getUsersData = require('express').Router();
const pool = require('./pool');

getUsersData.get("/users", (req, res) => {
    const sessionId = req.cookies.sessionId;

    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM applicants WHERE sessionId='${sessionId}'`, (err, rows) => {
            connection.release();

            if(err) throw err;

            let data = JSON.stringify(rows);
            data = JSON.parse(data);

            res.status(200).json({
                data: data
            })
        })
    })
})

module.exports = getUsersData;