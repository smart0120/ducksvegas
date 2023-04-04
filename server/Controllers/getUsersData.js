const getUsersData = require('express').Router()
const pool = require('./pool')

getUsersData.get("/users", (req, res) => {
  const sessionId = req.cookies.sessionId

  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM applicants WHERE sessionId='${sessionId}'`, (err, rows) => {
      connection.release()

      res.status(200).json(rows[0])
    })
  })
})

module.exports = getUsersData