import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownload from "image-downloader";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import fs from "fs";
import Place from "./models/place.js";
import Bookings from "./models/bookings.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/uploads`);
  },
  filename: function (req, file, cb) {
    const newFilename = `photo${Date.now()}`;
    cb(
      null,
      `${newFilename}${file.originalname.slice(
        file.originalname.lastIndexOf(".")
      )}`
    );
  },
});
const upload = multer({ storage: storage });

dotenv.config();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/uploads", express.static(`${__dirname}/uploads`));
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ err: "All inputs must be filled" });
    }
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ err: "There user already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const harshedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: harshedPassword,
    });

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
    console.log(
      `There is a problem in the register Controller: ${error.message}`
    );
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ err: "All inputs must be filled" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ err: "User is not found" });
    }
    const isValidPassword = await bcrypt.compare(password, findUser.password);

    if (!isValidPassword) {
      return res.status(400).json({ err: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: findUser._id, name: findUser.name, email: findUser.email },
      process.env.ACCESS_TOKEN
    );
    res.cookie("token", token).json(findUser);
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
    console.log(`There is a problem in the login Controller: ${error.message}`);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) throw err.message;
      res.status(200).json(user);
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.json(true);
});

app.post("/upload-link", async (req, res) => {
  const { link } = req.body;
  const photoExt = "photo" + Date.now() + ".jpg";
  const options = {
    url: link,
    dest: `${__dirname}/uploads/${photoExt}`,
  };

  imageDownload
    .image(options)
    .then(({ filename }) => {
      res.json(photoExt);
    })
    .catch((err) => console.log(err.message));
});

app.post("/upload-image", upload.array("photos", 50), (req, res) => {
  const files = req.files;
  const arrFiles = [];
  const result = files.forEach((file) => {
    arrFiles.push(file.filename);
  });
  res.status(200).json(arrFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    addedPhotos,
    perks,
    checkIn,
    checkOut,
    extraInfo,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) throw err.message;
    const place = await Place.create({
      owner: user.id,
      title,
      address,
      description,
      photos: addedPhotos,
      perks,
      checkIn,
      checkOut,
      extraInfo,
      maxGuests,
      price,
    });
    res.status(200).json(place);
  });
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) throw err.message;
    const newUser = await Place.find({ owner: user.id });
    res.status(200).json(newUser);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.json(place);
});

function getUserDataFromToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) throw err.message;
      resolve(user);
    });
  });
}

app.put("/places/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    address,
    description,
    addedPhotos,
    perks,
    checkIn,
    checkOut,
    extraInfo,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) throw err.message;
    const place = await Place.findById(id);
    if (place.owner.toString() === user.id) {
      await place.set({
        title,
        address,
        description,
        photos: addedPhotos,
        perks,
        checkIn,
        checkOut,
        extraInfo,
        maxGuests,
        price,
      });

      await place.save();
      res.json("okay");
    }
  });
});

app.get("/all-places", async (req, res) => {
  const places = await Place.find({});
  // console.log(places);

  res.json(places);
});

app.get("/place/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    res.json(place);
  } catch (error) {
    console.log("Error occurred in the place/id controller:" + error.message);
  }
});

app.post("/bookings", async (req, res) => {
  const { token } = req.cookies;
  const { checkIn, checkOut, numberOfGuests, name, mobile, place, price } =
    req.body;
  try {
    const { id } = await getUserDataFromToken(token);
    const newBookings = new Bookings({
      user: id,
      place,
      checkIn,
      checkOut,
      phone: mobile,
      guest: numberOfGuests,
      name,
      price,
    });
    newBookings.save().then((data) => res.json(data));
  } catch (error) {
    console.log("Error occurred in the bookings controller:" + error.message);
  }
});

app.get("/bookings", async (req, res) => {
  // const { token } = req.cookies;
  const users = await Bookings.find().populate("place");//get user
  // console.log(user)
  res.json(users);
});

async function connectDB(uri) {
  await mongoose
    .connect(uri)
    .then((res) => console.log("Database is connected successfully"))
    .catch((err) => console.log(err.message));
}

const port = process.env.PORT || 4000;
// losmorgan
async function start() {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Server is rumning on port ${port}`));
}
start();
