//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post("/", (req, res) => {
  const api_key = ""; // you can obtain API key @ openweathermap.org
  const city = req.body.cityName;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${api_key}`;
  https.get(url, (resp) => {
    resp.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconAddress = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The tempereture in ${city} is  ${temp} celsius</h1>`);
      res.write(
        `The weather is currently ${desc}.<img src="${iconAddress}" alt="current-weather">`
      );
      res.send();
    });
  });
});

app.listen(process.env.PORT);
