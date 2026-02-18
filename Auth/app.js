const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db")
const pageRoute = require("./routes/pages")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT ;
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(bodyParser.json()); 

app.use("/api/auth", userRoute);
app.use("/", pageRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
