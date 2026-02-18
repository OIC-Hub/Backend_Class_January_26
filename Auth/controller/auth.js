const User = require("../model/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendEmail } = require("../service/mail");
dotenv.config();

function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      otp: otp
    });

    newUser.save();
    // res.status(201).json({ message: "User registered successfully" });
    sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);
    // res.render("verifyotp", { email });
    res.redirect("/verifyotp");
    console.log(otp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData || !(await bcrypt.compare(password, userData.password))) {
            // If it's a form submission, you might want to render login with an error message
            return res.status(401).render("login", { error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: userData._id, role: userData.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.redirect("/api/auth/profile");
    } catch (error) {
        res.status(500).send("Server error");
    }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).select("-password");
      if (!userData) {
      return res.redirect("/login");
    }

    // This correctly passes the data to EJS
    res.render("dashboard", { userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const getUser = async (req, res) => {
  try {
    const allUser = await User.find(); 
    res.render("home", { allUser });   
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading page");
  }

};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // res.status(200).json({ message: "OTP verified successfully" });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}



// function dashboard(req, res) {
//   res.render("dashboard");
// }

function loginpage(req, res) {
  res.render("login");
}

function registerpage(req, res) {
  res.render("register");
}

function otpPage(req, res) {
  res.render("verifyotp");
}
module.exports = {
  registerUser,
    loginUser,
    getUser,
    getProfile,
    verifyOTP,
    loginpage,
    registerpage,
    otpPage,
    // homepage
};
