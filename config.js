const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRES_IN: 3600000 * 24,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  SERVER_URI: process.env.SERVER_URI,
  twitter: {
    consumerKey: "yV34MsRaX9DRCsjVwSlNLVTsI",
    consumerSecret: "dGCVUxzE66KLxTjFIRSnqFbcjW1TV1p6WC52cqrgKpXSRp4itn",
    callbackURL: `${process.env.SERVER_URI}twitter`
  }
};
