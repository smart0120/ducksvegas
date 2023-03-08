const getRidesByUserName = require('express').Router();
const pool = require('./pool');

getRidesByUserName.get("/raids/:username", (req, res) => {
    const username = req.params.username;
    console.log(username)
    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM rides WHERE userName='${username}'`, (err, rows) => {
            connection.release();

            if(err) throw err;

            let data = JSON.stringify(rows);
            data = JSON.parse(data);

            res.json({
                status: "success",
                data
            })
        })
    })
})

module.exports = getRidesByUserName;