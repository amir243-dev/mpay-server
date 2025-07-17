const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CONTROLLER 1: THE SIGN-UP

const register = async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ message: "Password MisMatch" });
  }
  //   ============

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   =======
  try {
    const user = await User.create({ email, password: hashedPassword });
    console.log(user);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKey, {
      expiresIn: "3d",
    });

    res
      .status(201)
      .json({ message: "Registered Successfully", id: user._id, token });
  } catch (err) {
    console.error(err);
  }
};

// CONTROLLER 2: THE SIGN-IN

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email Required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password Required" });
  }

  //   ==============

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  if (!email) {
    return res.status(401).json({ message: "Email does not exist" });
  }
  //   ========

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRETKey, {
    expiresIn: "3d",
  });

  res.status(201).json({ message: "Login Successfull", id: user._id, token });
};

// CONTROLLER TO GET USERS IN THE DATABASE THAT ARE LOGGED-IN OR REGISTERED.

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.status(200).json({
    id: user._id,
    email: user.email,
    password: user.password,
  });
};

module.exports = { register, login, getUser };
