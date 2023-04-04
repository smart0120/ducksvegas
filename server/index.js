const express = require('express')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const path = require("path")
const router = require('./router')
const getUserData = require('./Controllers/getUsersData')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const api = require('./Controllers/api')
const config = require('../config')

const app = express()
app.use(
  session({ secret: 'twitter2020!', resave: true, saveUninitialized: true })
)
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());
app.use(cookieParser());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(router);
app.use(api.getUserData);
app.use(api.addRide);
app.use(api.getRide);
app.use(api.getRidesByUserName);
app.use(api.checkStatus);
app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(config.PORT, async () => {
  console.log(`server is up to port ${config.PORT}`)
})