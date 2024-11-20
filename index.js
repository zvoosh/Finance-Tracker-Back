//init da napravis json fajl za depedencije
//npm install cors body-parser express nodemon mongoose
// import express from 'express';
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

var port = process.env.PORT || 3000;

//connect to mongodb
const db = 'mongodb+srv://dusanilic1999:ilic99@milatrack.yyxuo.mongodb.net/mila-track';
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log(port);
    app.listen(port);
    console.log('Running')
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());

var table = require("./api/tables");
app.use("/api/table", table);
var trosak = require("./api/trosak");
app.use("/api/trosak", trosak);

app.use(bodyParser.json());
app.use(cors());