const { ObjectId } = require("mongodb");
const {
    connectDB,
    hashPassword,
    randomStringGenerator,
} = require("../utility/helper");

const registerUser = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Hashing the Password
    const hashedPassword = await hashPassword(password);

    const userObj = { firstName, lastName, email, password: hashedPassword };

    // DB Connection and insertion
    const db = await connectDB();
    const user = await db.collection("users").insertOne(userObj);

    res.status(200).json({ msg: "Registered the User", user });
};

const forgotPassword = async(req, res) => {
    console.log("Email", req.body);

    // DB Connection and insertion
    const db = await connectDB();
    const userExists = await db.collection("users").findOne(req.body);

    console.log("User exists", userExists);

    if (userExists) {
        // Ge
        const userId = userExists._id;
        const randomString = randomStringGenerator();

        const updatedStr = await db
            .collection("users")
            .updateOne({ _id: userId }, { $set: { randomStr: randomString } });

        res.status(200).json({
            msg: "User exists",
            randomStr: `${process.env.BASE_URL}?userId=${userId}&str=${randomString}`,
        });
    } else {
        res.status(404).send("User does not exists");
    }
};

module.exports = { registerUser, forgotPassword };