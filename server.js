const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const app = express();
const cheerio = require("cheerio");
const PORT = process.env.PORT || 3001;
const Users = require('./model/Users');
const jwt = require('jsonwebtoken');
const crimeLocationsController = require('./controllers/crimeLocationController');
const newsFeedController = require('./controllers/newsFeedController');
var Userspass = require('./controllers/userController');
process.env.SECRET_KEY = 'secret';
require('dotenv').config("./.env");
const SubwayStations = require ('./model/SubwayStations');

// Defining middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname ,"client/build")));
//  app.use(express.static(path.join(__dirname ,"./client/public")));

// Set up mongoose locally and for mLab.
const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost/project_db";
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

var db = mongoose.connection;
db.once("open", () => {console.log('Connected')});
db.on("error", function(err){
console.log(err);
});

// For local testing of the app.
// app.get("",  function () {
//   res.sendFile(path.join(__dirname, "index.html"));
// })

// app.get("/", (req, res) => {
//   res.render(path.join(__dirname, "index.html"))
// });

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



// This end point will facilitate the scraping of the headline and the image for the comment page, in relation to articles that are commented on.
app.get("/article_specs",(req,res) => {
  axios.get("https://www.nydailynews.com/new-york/nyc-crime/ny-video-attack-harriman-20200118-so3skb4z5nfq5ogrulrp754hfy-story.html")
  .then(function(response){
    var $ = cheerio.load(response.data);
  
  let results = [];

  $(".crd--cnt").each(function(i, element){
      var title = $(element).find("h1").text();


      // var img = $(element).find('figure').find('img').find('src');
      var img = $(element).find(".r-mb").find("img").attr("alt");
      // var text = 
      if(title !== "" ){
          results.push({
              title:title,
              image:img,
              
          })
      }
  })
  let resultsList = [];
  resultsList.push(results[0]);
  res.json(resultsList);
  
  })


  // console.log(req)
  // axios.get("https://www.nydailynews.com/new-york/nyc-crime/ny-video-attack-harriman-20200118-so3skb4z5nfq5ogrulrp754hfy-story.html")
  // .then(function(response){
  // const cheerio = require("cheerio");
  // var $ = cheerio.load(response.data);
  // var result = [];

  // $(".artcl--m").each(function(i, element){
  //   var title = $(element).find("h1").text();
  //   result.push({
  //     title:title
  //   })
  // })

  // res.json(result)

  // });
})

app.get('/train_data_db', (req,res) => {
  SubwayStations.find({})
  .then((result) => {
    console.log("Train data in DB => ",result.length);
    res.json(result);
  });
})

app.get('/train_latlng', (req,res) => {
  axios.get('https://data.cityofnewyork.us/resource/kk4q-3rt2.json')
  .then(function(response){
    // console.log(response.data)
    response.data.map( (item)=> {
      let results = {};
      let station = item.name;
      let latitude = item.the_geom.coordinates[1];
      let longitude = item.the_geom.coordinates[0];
      let line = item.line;
      let info = item.notes;

      results.station = station;
      results.latitude = latitude;
      results.longitude = longitude;
      results.line = line;
      results.info = info;

      SubwayStations.create(results)
      .then((res) => {console.log("Loaded Subway info to DB...", res)})
      .catch((err) => {console.log(err)})
    })
  })

})

app.delete("/dropDB",()=>{
  mongoose.connect(MONGODB_URL, function () {
    db.db.dropDatabase();
  });
})
  
// Send every other request to the react app.
app.get("*", (req, res) => {
    //This top res.send is for the development server on heroku.
    res.sendFile(path.join(__dirname, "./public/index.html"));
    // res.sendFile(path.join(__dirname, "./client/src/index.js"));
    
});

app.listen(PORT, () => {
    console.log(`===> API server now on port ${PORT}!`);
});