const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const contactRouter = require("./routes/contactRouter");
const authRouter = require("./routes/authRouter");

const app = express();

const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/contact", contactRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected");

    app.listen(port, () => {
      console.log(`Server is running in port ${port}`);
    });
  } catch (err) {
    console.error(err);
    console.log("Unable to connect");
  }
};

start();

// WHAT IS A MODEL FOLDER USED FOR IN AN EXPRESS.JS BACKEND: a models folder is typically used to define the data structure and schema of your application.

// WHAT IS THE CONTROLLER USED FOR IN AN EXPRESS.JS BACKEND: In an Express.js backend, the controllers folder is used to store the logic for handling incoming requests and sending responses — essentially, the "brains" behind each route.

// WHAT IS THE ROUTES FOLDER USED FOR IN AN EXPRESS.JS BACKEND: In an Express.js backend, the routes folder is used to organize the different API endpoints (routes) of your application. It's where you define what should happen when the server receives specific HTTP requests (like GET, POST, PUT, DELETE) at certain URLs.

// THESE FOLDERS ARE THE MOST IMPORTANT FOLDERS NEEDED IN AN BACKEND ENVIRONMENT.

// FLOW ==> MODEL-FOLDER[STRUCTURE OF HOW YOU WANT DATA STORED] => CONTROLLER-FOLDER[BUSINESS-LOGIC FROM THE CLIENT REQUEST AND SERVER-RESPONSES] => ROUTES-FOLDER[APIS, END-POINTS, SPECIFIC HTTP REQUEST], THEN BACK TO THE APP.JS.

// AN EXAMPLE OF A MODEL-FOLDER STRUCTURE.
//  const signup = {
//     email: "",
//     password: ""
//     repeatPassword: ""
//  }

// amirajibola243
// JifaRfMIXp6vEI1K
// mongodb+srv://amirajibola243:JifaRfMIXp6vEI1K@cluster0.0hd8mna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
