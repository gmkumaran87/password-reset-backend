const conndbConnectionectDb = require("../db/connect");

const connectDB = async() => {
    const client = dbConnection();
    const db = (await client).db("PasswordReset");
    return db;
};

module.exports = connectDB;