const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;
const Users = require('./model/Users');
const jwt = require('jsonwebtoken');
const crimeLocationsController = require('./controllers/crimeLocationController');
const newsFeedController = require('./controllers/newsFeedController');
var Userspass = require('./controllers/userController');
process.env.SECRET_KEY = 'secret';
require('dotenv').config("./.env");

// Defining middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname ,"client/build")));

// Set up mongoose locally and for mLab.
const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost/project_db";
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

var db = mongoose.connection;
db.once("open", () => {console.log('Connected')});
db.on("error", function(err){
console.log(err);
});

app.get("/add/user", function(req,res){
  Users.find({}, function(err, data){
    if(err){console.log(err)}
    res.json(data);
  });
});

app.use('/', Userspass);

// This route queiries all users currently in the database.
app.get("/api", (req, res) => {
    Users.find({}).then((result) => {
        res.send(result);
    });  
});


app.post('/login', (req, res) => {
  res.send("UserAbbosjon");
    Users.findOne({
      email: req.body.email})
    });

// Queries crime info from data set. 
app.get("/api/crime",crimeLocationsController.getCrimeData);

// Posts crime data to the database.
app.post("/api/crime", crimeLocationsController.addCrimeDataToDB);


app.get("/api/AddressToLatLng", (req,res) => {
  const apiKey = "AIzaSyA-VspoF45DKRHLsuzBL0-hecHDNOUQdOY"
  
  axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA-VspoF45DKRHLsuzBL0-hecHDNOUQdOY")
    .then(function(response){
        res.json(response.data);
    }).catch(function(err){
        if (err) console.log(err);
    })
});

app.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    Users.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err);
      })
  });

// This route deletes user from database (Requires debugging.) 
app.delete("/delete/:id", (req, res) => {
    let userId = req.params.id;
    Users.findByIdAndDelete({_id:userId})
    .then((res) => {
        console.log(res)
        .catch((err) => {console.log(err)})   
    });
    res.end();
});

app.get("/apikey", (req,res) => {
    res.json(process.env.APIkey);
});

// News is scraped from the New York Times website.
app.get("/scrapeNews",newsFeedController.getScrapedNews);
  
// Send every other request to the react app.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`===> API server now on port ${PORT}!`);
});