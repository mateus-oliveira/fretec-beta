require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require('./routes');

const server = express();

// Conectando com o Mongo DB
mongoose.connect(
    'mongodb://localhost:27017/fretec-beta', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
);

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use(routes);
server.listen(80);