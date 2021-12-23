const bcrypt = require("bcryptjs");
const conndbConnectionectDb = require("../db/connect");

const connectDB = async() => {
    const client = dbConnection();
    const db = (await client).db("PasswordReset");
    return db;
};

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
module.exports = { connectDB, hashPassword };