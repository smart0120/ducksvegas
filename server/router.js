const { getFirstPage, getTwitter, getCurrentProfile } = require('./Controllers/Twitter')
const passport = require('passport')
const Strategy = require('passport-twitter').Strategy
const config = require('../config')

//bearer AAAAAAAAAAAAAAAAAAAAALN%2FkgEAAAAAmJe66%2B6af6ZyFm6rOf%2FTOO%2FQI6g%3DbMcNVZg75qj945CxSv1W82bKkZsenBYlLrMqEr1V0WIH7LZEvH

passport.use(
  new Strategy(
    config.twitter,
    (token, tokenSecret, profile, callback) => {
      return callback(null, profile)
    }
  )
)

passport.serializeUser((user, callback) => {
  try {
    callback(null, user)
  } catch (error) {
    return error
  }
})

passport.deserializeUser((obj, callback) => {
  try {
    callback(null, obj)
  } catch (error) {
    return error
  }
})

const router = require('express').Router()

router.get('/', getFirstPage)
router.get('/twitter/login', passport.authenticate('twitter'), getTwitter)
router.get('/twitter', passport.authenticate('twitter'), getTwitter)
router.get('/current-profile', getCurrentProfile)

module.exports = router
