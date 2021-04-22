// initialisation du server express
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// import des fichiers 
require("dotenv").config({path: "./config/.env"});
const {mongoose} = require("./config/db");
const userRoute = require("./routes/userRoute")

const app = express();

// settings cors

const corOptions = {
    origin:process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};

app.use(cors(corOptions));

// gestion des fichiers 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/user", userRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`server listening on port ${process.env.PORT}`);
});

