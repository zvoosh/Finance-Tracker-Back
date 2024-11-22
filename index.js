const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');

const app = express();

const port = process.env.PORT || 3000;

mongoose.set("debug", true);

// MongoDB connection URI
const db = "mongodb+srv://dusanilic1999:ilic99@milatrack.yyxuo.mongodb.net/mila-track";

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Test logging to ensure execution reaches this point
console.log("Mongoose connection initiated. Waiting for MongoDB connection...");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 500, // Limit each IP to 200 requests per windowMs
//   message: 'Too many requests, please try again later.',
// });

// app.use('/api', limiter);


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

// Routes
const table = require("./api/tables");
app.use("/api/table", table);

const user = require("./api/users");
app.use("/api/user", user);

const trosak = require("./api/trosak");
app.use("/api/trosak", trosak);
