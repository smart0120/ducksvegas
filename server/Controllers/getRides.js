const getRides = require('express').Router()
const pool = require('./pool')

getRides.get("/raids", (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM rides`, (err, rows) => {
      connection.release()

      if (err) {
        return res.status(400)
      }

      res.status(200).json(rows)
    })
  })
})

module.exports = getRides