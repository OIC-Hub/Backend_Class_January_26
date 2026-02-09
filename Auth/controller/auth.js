const User = require("../model/Auth");
const bcrypt = require("bcrypt");

function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    newUser.save();
    res.status(201).json({ message: "User registered successfully" });
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

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({ message: "User", allUser });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  registerUser,
    loginUser,
    getUser
};
