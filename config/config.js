require('dotenv').config()

const config = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST, //"127.0.0.1"
        "dialect": "postgres",
        "port": process.env.DB_PORT
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME_TEST,
        "host": process.env.DB_HOST, //"127.0.0.1"
        "dialect": "postgres",
        "port": process.env.DB_PORT
    }
}

module.exports = config