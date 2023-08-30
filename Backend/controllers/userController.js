const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const secret_key = "abc123";

// @desc Register new user
// @route post/api/user
// @access public
const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error({ message: "Please enter all fields" });
  }

  // check if user exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(401);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Authenticate the user
// @route post/api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

// @desc Get user data
// @route get/api/user/me
// @access public
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// get the jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, secret_key, {
    expiresIn: "30d",
  });
};

module.exports = { userRegister, getMe, loginUser };
