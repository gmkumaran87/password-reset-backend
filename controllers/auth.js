const { ObjectId } = require("mongodb");
const {
    connectDB,
    hashPassword,
    randomStringGenerator,
} = require("../utility/helper");

const { sendGridMail, sendEmail } = require("../utility/sendMail");

const registerUser = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Hashing the Password
    const hashedPassword = await hashPassword(password);

    const userObj = { firstName, lastName, email, password: hashedPassword };

    // DB Connection and insertion
    const db = await connectDB();

    // Finding the User present in the DB
    const userExists = await db.collection("users").findOne({ email: email });

    // If the User doesn't exists in the DB
    if (!userExists) {
        const user = await db.collection("users").insertOne(userObj);
        res.status(200).json({ msg: "Registered the User", user });
    }

    res.status(400).json({
        msg: "Email provided is already registered, please login or try with another account",
    });
};

const forgotPassword = async(req, res) => {
    // DB Connection and insertion
    const db = await connectDB();
    const userExists = await db.collection("users").findOne(req.body);

    if (userExists) {
        // Ge
        const userId = userExists._id;
        const randomString = randomStringGenerator();

        const updatedStr = await db
            .collection("users")
            .updateOne({ _id: userId }, { $set: { randomStr: randomString } });

        const resetLink = `${process.env.BASE_URL}?userId=${userId}&randomStr=${randomString}`;
        // Sending email
        const mailInfo = sendGridMail(req.body.email, resetLink);

        res.status(200).json({
            msg: "Please check your email for the Password reset Link",
        });
    } else {
        res.status(404).json({
            msg: "User account does not exists, please enter valid email id",
        });
    }
};

const resetPassword = async(req, res) => {
    const { userId, randomStr } = req.query;

    console.log(userId, randomStr);

    const db = await connectDB();
    const userExists = await db
        .collection("users")
        .findOne({ _id: ObjectId(userId), randomStr: randomStr });

    console.log(userExists);

    res.status(200).json({ msg: "Validation received", userExists });
};

module.exports = { registerUser, forgotPassword, resetPassword };