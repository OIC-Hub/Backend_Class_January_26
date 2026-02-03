const express = require("express");
const dotenv = require("dotenv");
const contactRoute = require("./Routes/contact");
const bodyParser = require("body-parser");
const connectDB = require("./config/db")
dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(bodyParser.json()); 

app.use("/api", contactRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
