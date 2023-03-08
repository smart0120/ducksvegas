const addRide = require('express').Router();
const pool = require('./pool');
const axios = require('axios');

addRide.post("/raid", (req, res) => {
    const {discordId, projectName, tweetLink, minCharacters, minFollowers, mandatoryWord, forbiddenWords, budget, avatar, userName} = req.body;
    const tweetId = tweetLink.slice(-19);
    const config = {
        method: 'get',
        url: `https://api.twitter.com/2/tweets/${tweetId}`,
        headers: {
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALN%2FkgEAAAAAmJe66%2B6af6ZyFm6rOf%2FTOO%2FQI6g%3DbMcNVZg75qj945CxSv1W82bKkZsenBYlLrMqEr1V0WIH7LZEvH',
            'Cookie': 'guest_id=v1%3A167748295145431856; guest_id_ads=v1%3A167748295145431856; guest_id_marketing=v1%3A167748295145431856; personalization_id="v1_AQUHeK5OnjmAK2G92n7cpg=="'
        }
    };

    axios(config)
        .then(function (response) {
            const data = response.data.data;
            const text = data.text;
            const query = `INSERT INTO rides(discordId, projectName, tweeterLink, minCharacters, minFollowers, forbiddenWords, budget, mandatoryWord, avatar, tweetDescription, tweetID, userName) VALUES('${discordId}', '${projectName}', '${tweetLink}', '${minCharacters}', '${minFollowers}', '${forbiddenWords}', '${budget}', '${mandatoryWord}', '${avatar}', '${text}', '${tweetId}', '${userName}')`
            pool.getConnection((err, connection) => {
                connection.query(query, (err, rows) => {
                    connection.release();

                    if(err) throw err;

                    res.json({
                        status: "success",
                        message: "New raid created",
                        tweetText: text
                    })
                })
            })
        })
        .catch(function (error) {
            console.log(error);
        });
})

module.exports = addRide