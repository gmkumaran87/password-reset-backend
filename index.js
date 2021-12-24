const express = require("express");
require("dotenv").config();

// Security Libraries
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Router imports
const authRouter = require("./routes/auth");

app.use("/api/v1/register", authRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Password reset app");
});
// Starting the Server
const port = process.env.PORT;
app.listen(port, () => console.log("App started in the Port -", port));