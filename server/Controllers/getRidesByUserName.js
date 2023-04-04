const getRidesByUserName = require('express').Router()
const pool = require('./pool')

getRidesByUserName.get("/raids/:username", (req, res) => {
  const username = req.params.username
  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM rides WHERE userName='${username}'`, (err, rows) => {
      connection.release()

      if (err) throw err

      res.json(rows)
    })
  })
})

module.exports = getRidesByUserName