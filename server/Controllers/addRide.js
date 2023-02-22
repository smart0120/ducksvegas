const addRide = require('express').Router();
const pool = require('./pool');

addRide.post("/raid", (req, res) => {
    const {discordId, projectName, tweetLink, minCharacters, minFollowers, mandatoryWord, forbiddenWords, budget, avatar} = req.body;

    const query = `INSERT INTO rides(discordId, projectName, tweeterLink, minCharacters, minFollowers, forbiddenWords, budget, mandatoryWord, avatar) VALUES('${discordId}', '${projectName}', '${tweetLink}', '${minCharacters}', '${minFollowers}', '${forbiddenWords}', '${budget}', '${mandatoryWord}', '${avatar}')`
    pool.getConnection((err, connection) => {
        connection.query(query, (err, rows) => {
            connection.release();

            if(err) throw err;

            res.json({
                status: "success",
                message: "New raid created"
            })
        })
    })
})

module.exports = addRide