import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender, address } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      address,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const isPasswordCorrect = await bcryptjs.compare(
        password,
        user?.password || ""
      );
  
      if (!user || !isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid Username or Password" });
      }
  
      generateTokenAndSetCookie(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      });
    } catch (error) {
      console.log("Error in login controller: ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };