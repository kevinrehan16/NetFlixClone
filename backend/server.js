import express from "express";
import { connectToDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors"; //! Use CORS so that the FRONTEND can connect to your BACKEND

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

//! Use CORS so that the FRONTEND can connect to your BACKEND
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world")
});

app.post("/api/signup", async (req, res) => {
  const {username, email, password} = req.body;
  
  if(!username || !email || !password){
    return res.status(400).json({message: "All fields are required!"});
  }

  try {
    const emailExist = await User.findOne({email});
    if(emailExist){
      return res.status(400).json({message: "Email alredy exist."});
    }

    const usernameExist = await User.findOne({username});
    if(usernameExist){
      return res.status(400).json({message: "Username alredy taken, try another name."});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // JWT - JSON WEB TOKEN
    if(userDoc){
      // jwt.sign(payload, secrets, option) - this function save this 3 parameters
      const token = jwt.sign({id: userDoc._id}, process.env.JWT_TOKEN, {
        expiresIn: "7d",
      })

      res.cookie("myToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
    return res.status(200).json({user: userDoc, message: "New user successfully created."});
  } catch (error) {
    return res.status(400).json({message: "Error encountered: \n"+error.message});
  } 
});

app.post("/api/login", async (req, res) => {
  const {username, password} = req.body;

  if(!username || !password){
     return res.status(400).json({message: "All fields are required!"});
  }

  try {
    const userDoc = await User.findOne({username});
    if(!userDoc){
      return res.status(400).json({message: "Invalid username."});
    }
    
    const isPasswordValid = await bcryptjs.compareSync(password, userDoc.password);
    if(!isPasswordValid){
      return res.status(400).json({message: "Invalid password."});
    }

    // JWT
    if(userDoc){
      // jwt.sign(payload, secrets, option) - this function save this 3 parameters
      const token = jwt.sign({id: userDoc._id}, process.env.JWT_TOKEN, {
        expiresIn: "7d",
      })

      res.cookie("myToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
    return res.status(200).json({user: userDoc, message: "User successfully login."});
  } catch (error) {
    console.log("Error logging in: ", error.message);
    return res.status(400).json({message: "Error encountered: \n"+error.message});
  }
})

app.get("/api/fetch-user", async (req, res) => {
  const token = req.cookies.myToken;

  if(!token) {
    return res.status(401).json({message: "No token provided."});
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    if(!decode) {
      return res.status(401).json({message: "Invalid Token."});
    }

    const userDoc = await User.findById(decode.id).select("-password");
    if(!userDoc){
      return res.status(400).json({message: "No user found."});
    }

    res.status(200).json({user: userDoc});

  } catch (error) {
    console.log("Error fetching user encountered: ", error.message);
    return res.status(400).json({message: "Error encountered: \n"+error.message});
  }
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie("myToken");
  res.status(200).json({message: "Logged out successfully."});
});

app.listen(PORT, () => {
  connectToDB();
  console.log("Server is running on port: "+PORT);
})