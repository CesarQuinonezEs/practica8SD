const{config} = require('dotenv')
config();
module.exports = {
    db:{
        user: process.env.DB_USER,
        passwd: process.env.DB_PASSWD,
    }
}