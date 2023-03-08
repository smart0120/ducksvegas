const addRide = require('./addRide');
const getRide = require('./getRides');
const getUserData = require('./getUsersData');
const getRidesByUserName = require('./getRidesByUserName');
const checkStatus = require('./checkStatus')

const api = {
    addRide, getRide, getUserData, getRidesByUserName, checkStatus
}

module.exports = api