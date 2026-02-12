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
    res.status(201).json({ message: "User registered successfully" });
    sendEmail(email, "OTP Verification", `Your OTP is: ${otp}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isPasswordValid = await bcrypt.compareSync(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let token = jwt.sign({ id: userData._id, role: userData.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User profile", userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const getUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({ message: "User", allUser });
  } catch (error) {
    console.error(error);
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

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerUser,
    loginUser,
    getUser,
    getProfile,
    verifyOTP
};
