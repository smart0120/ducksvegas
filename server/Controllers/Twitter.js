const pool = require("./pool");

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const getFirstPage = (req, res) => {
  try {
    res.status(200).send('Hello From Nodejs + Twitter')
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}

const getTwitter = (req, res) => {
  try {
    const sessionId = generateString(30);
    pool.getConnection((err, connection) => {
      connection.query(`SELECT * FROM applicants WHERE twitterUsername='${req.user.username}'`, (err, rows) => {
        connection.query;
        if(err) {
          throw err
        }

        console.log(req.query.role)

        let data = JSON.stringify(rows);
        data = JSON.parse(data);

        if(data.length === 0){
          connection.query(`INSERT INTO applicants(walletId, twitterUserName, category, followersCount, balance, nfts, nbRaids, pfp, raided, twitterId, sessionId, avatar) VALUES('', '${req.user.username}', '', ${req.user._json.followers_count}, '0.00', '', 0, '', 0, '${req.user._json.id}', '${sessionId}', '${req.user._json.profile_image_url_https}')`, (err, row) => {
            connection.release();
            if(err) throw err;
            res.redirect(`http://localhost:3000/auth/link-wallet?id=${sessionId}`);
          } )
        }else{
          connection.query(`UPDATE applicants SET followersCount=${req.user._json.followers_count}, sessionId='${sessionId}', avatar='${req.user._json.profile_image_url_https}' WHERE twitterUserName='${req.user.username}'`, (err, rows) => {
            connection.release();

            if(err) throw err;
            res.redirect(`http://localhost:3000/auth/link-wallet?id=${sessionId}`);
          })
        }
      })
    })
  } catch (error) {
    res.status(500).send('Something Went Wrong')
  }
}

const getCurrentProfile = (req, res) => {
  try {
    res.send(`Hello! ${req.query.username}`)
  } catch (error) {
    res.status(500).send('Something Went Wrong')
  }
}

module.exports = {
  getFirstPage,
  getTwitter,
  getCurrentProfile
}
