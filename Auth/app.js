const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db")

const userRoute = require("./routes/user")
dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(bodyParser.json()); 

app.use("/api/auth", userRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
