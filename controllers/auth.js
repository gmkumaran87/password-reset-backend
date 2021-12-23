const { ObjectId } = require("mongodb");
const connectDB = require("../utility/helper");

const registerUser = async(req, res) => {
    console.log(req.body);

    const db = await connectDB();

    const user = await db.collection("users").insertOne(req.body);

    res.send("Registerd the User");
};

module.exports = { registerUser };