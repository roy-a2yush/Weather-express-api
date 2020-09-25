const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

const url = "https://api.openweathermap.org/data/2.5/weather?appid=f20d92de6a19b195a61fb02bdec5ecce&units=metric&q=";

app.post("/", function(req, res) {
  var loc = req.body.place;
  var sendUrl = url + loc;
  var weatherData;
  https.get(sendUrl, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      weatherData = JSON.parse(data);
      console.log(weatherData);
      res.send("<h3>The temperature is "+weatherData.main.temp+" degrees Centigrade.</h3>");
    });
  });
});

app.listen(3000, function() {
  console.log("The server has started at port 3000");
})
