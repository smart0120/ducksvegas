const checkStatus = require('express').Router();
const pool = require('./pool');
const axios = require('axios');
const {application} = require("express");

checkStatus.put('/raid/check-status', (req, res) => {
    const userName = req.body.username;
    const tweetID = req.body.tweetID;
    const sessionID = req.cookies.sessionId;
    const amount = req.body.amount;
    const forbidden = req.body.forbidden;
    const required = req.body.required;
    const minCharacters = req.body.minCharacters;

    console.log(tweetID)

    const config = {
        method: 'get',
        url: `https://api.twitter.com/2/tweets/${tweetID}/retweeted_by`,
        headers: {
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALN%2FkgEAAAAAmJe66%2B6af6ZyFm6rOf%2FTOO%2FQI6g%3DbMcNVZg75qj945CxSv1W82bKkZsenBYlLrMqEr1V0WIH7LZEvH',
            'Cookie': 'guest_id=v1%3A167748295145431856; guest_id_ads=v1%3A167748295145431856; guest_id_marketing=v1%3A167748295145431856; personalization_id="v1_AQUHeK5OnjmAK2G92n7cpg=="'
        }
    };

    const getIdConfig = {
        method: 'get',
        url: `https://api.twitter.com/2/users/by/username/${userName}`,
        headers: {
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALN%2FkgEAAAAAmJe66%2B6af6ZyFm6rOf%2FTOO%2FQI6g%3DbMcNVZg75qj945CxSv1W82bKkZsenBYlLrMqEr1V0WIH7LZEvH',
            'Cookie': 'guest_id=v1%3A167748295145431856; guest_id_ads=v1%3A167748295145431856; guest_id_marketing=v1%3A167748295145431856; personalization_id="v1_AQUHeK5OnjmAK2G92n7cpg=="'
        }
    };

    axios(config)
        .then( (resp) => {
            const data = resp.data.data;
            const check = data.filter((user) => {
                if(user.username == userName) return user
            })
            console.log(userName)
            console.log(data)
            if(check.length > 0){
                axios(getIdConfig)
                    .then(function (resID) {
                        const userId = resID.data.data.id;
                        const likesConfig = {
                            method: 'get',
                            url: `https://api.twitter.com/2/users/${userId}/liked_tweets`,
                            headers: {
                                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALN%2FkgEAAAAAmJe66%2B6af6ZyFm6rOf%2FTOO%2FQI6g%3DbMcNVZg75qj945CxSv1W82bKkZsenBYlLrMqEr1V0WIH7LZEvH',
                                'Cookie': 'guest_id=v1%3A167748295145431856; guest_id_ads=v1%3A167748295145431856; guest_id_marketing=v1%3A167748295145431856; personalization_id="v1_AQUHeK5OnjmAK2G92n7cpg=="'
                            }
                        };
                        axios(likesConfig)
                            .then(function (r) {
                                const likes = r.data.data;
                                const checkLikes = likes.filter((l) => {
                                    if(l.id == tweetID) return l;
                                })

                                console.log("likes config")

                                if(checkLikes.length == 0){
                                    return  res.status(200).json({
                                        status: "error",
                                        result: "failed"
                                    })
                                }else{
                                    pool.getConnection((err, connection) => {
                                        connection.query(`SELECT * FROM applicants WHERE sessionId='${sessionID}'`, (err, rows) => {
                                            connection.release();
                                            if(err) {
                                                console.log(err);
                                                return res.status(500).send("database error");
                                            }

                                            let data = JSON.stringify(rows);
                                            data = JSON.parse(data);

                                            let raids = [];

                                            if(data[0].completedRaids == null){
                                                raids.push(tweetID);
                                                const pushRaids = JSON.stringify(raids);
                                                const renewBalance = parseFloat(data[0].balance) + parseFloat(amount);
                                                connection.query(`UPDATE applicants SET completedRaids='${pushRaids}', balance='${renewBalance}' WHERE sessionId='${sessionID}'`, (err, row) => {
                                                    if(err) {
                                                        console.log(err);
                                                        return res.status(500).send("database error");
                                                    }

                                                    res.status(200).json({
                                                        status: "success",
                                                        result: "done"
                                                    })
                                                })
                                            }else{
                                                const raids = JSON.parse(data[0].completedRaids)
                                                if(raids.includes(tweetID)){
                                                    res.status(200).json({
                                                        status: "success",
                                                        result: "Raid already completed"
                                                    })
                                                }else{
                                                    const newRaid = [...raids, tweetID];
                                                    const pushRaids = JSON.stringify(newRaid);
                                                    const renewBalance = parseFloat(data[0].balance) + parseFloat(amount);

                                                    const replyConfig = {
                                                        method: 'get',
                                                        url: `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweetID}&tweet.fields=in_reply_to_user_id,author_id,created_at,conversation_id`,
                                                        headers: {
                                                            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALN%2FkgEAAAAAmJe66%2B6af6ZyFm6rOf%2FTOO%2FQI6g%3DbMcNVZg75qj945CxSv1W82bKkZsenBYlLrMqEr1V0WIH7LZEvH',
                                                            'Cookie': 'guest_id=v1%3A167748295145431856; guest_id_ads=v1%3A167748295145431856; guest_id_marketing=v1%3A167748295145431856; personalization_id="v1_AQUHeK5OnjmAK2G92n7cpg=="'
                                                        }
                                                    };

                                                    axios(replyConfig)
                                                        .then(function (rr) {
                                                            const replyData = rr.data.data;
                                                            console.log(rr)
                                                            const filterUsers = replyData.filter((fu) => {
                                                                if(fu.author_id == userId){
                                                                    return fu
                                                                }
                                                            })

                                                            let checker = {
                                                                characters: false,
                                                                forbidden: true,
                                                                required: true
                                                            }

                                                            if(filterUsers[0].text.length > minCharacters){
                                                                checker = {
                                                                    ...checker, characters: true
                                                                }
                                                            }
                                                            required.map((reqs, k) => {
                                                                if(!filterUsers[0].text.includes(reqs)){
                                                                    checker = {
                                                                        ...checker, required: false
                                                                    }
                                                                }
                                                            })

                                                            forbidden.map((forb) => {
                                                                if(filterUsers[0].text.includes(forb)){
                                                                    checker = {
                                                                        ...checker, required: false
                                                                    }
                                                                }
                                                            })
                                                            console.log(checker)
                                                            if(checker.characters == false || checker.forbidden == false || checker.required == false){
                                                                res.status(200).json({
                                                                    status: "success",
                                                                    result: "failed"
                                                                })
                                                            }else{
                                                                connection.query(`UPDATE applicants SET completedRaids='${pushRaids}', balance='${renewBalance}' WHERE sessionId='${sessionID}'`, (err, row) => {
                                                                    if(err) {
                                                                        console.log(err);
                                                                        return res.status(500).send("database error");
                                                                    }

                                                                    res.status(200).json({
                                                                        status: "success",
                                                                        result: "done"
                                                                    })
                                                                })
                                                            }

                                                        })
                                                        .catch(function (error) {
                                                            console.log(error);
                                                        });
                                                }
                                            }
                                        })
                                    })
                                }

                            })
                            .catch(function (error) {
                                res.status(500).json({
                                    status: "error",
                                    result: "failed",
                                    count: 1
                                })
                            });
                    })
                    .catch(function (error) {
                        res.status(500).json({
                            status: "error",
                            result: "failed",
                            count: 2
                        })
                    });
            }else{
                res.status(500).json({
                    status: "error",
                    result: "failed",
                    count: 3
                })
            }

        })
        .catch((err) => {
            res.status(500).json({
                status: "error",
                result: "failed",
                count: err,
                int: 4
            })
        });

})

module.exports = checkStatus;