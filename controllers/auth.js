const { ObjectId } = require("mongodb");
const connectDB = require("../utility/helper");
const { hashPassword } = require("../utility/helper");

const registerUser = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    console.log(firstName, email, password, hashedPassword);
    /*const db = await connectDB();

                const user = await db.collection("users").insertOne(req.body);*/

    res.status(200).json({ msg: "Registerd the User", password: hashedPassword });
};

module.exports = { registerUser };