import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";
import "dotenv/config";
import session from "express-session";
import crypto from "crypto";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    method: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(express.static("public"));

const secret = crypto.randomBytes(32).toString("hex");

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/chat", async (req, res) => {
  try {
    const queryParams = new URLSearchParams({
      message: req.body.text,
      uid: "user1",
    });

    const response = await fetch(
      `https://ai-chatbot.p.rapidapi.com/chat/free?${queryParams}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.CHAT_API_KEY,
          "X-RapidAPI-Host": "ai-chatbot.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get(
  "/auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/auth/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/google/auth/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
