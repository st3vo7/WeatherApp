const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("../utils/forecast");
const geocode = require("../utils/geocode");

const app = express();

// paths for Express cfg
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup hbs engine and views
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Stefan Maric",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Stefan Maric",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "This is helpful.",
    name: "Stefan Maric",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geocode(
    req.query.address,
    (error1, { latitude, longitude, location } = {}) => {
      if (error1) {
        return res.send({error1})
      }
      forecast(latitude, longitude, (error2, data2) => {
        if (error2) {
          return res.send({error2});
        }
        res.send({
          location: location,
          forecast: data2,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error page",
    message: "Help article not found",
    name: "Stefan Maric",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error page",
    message: "Page not found.",
    name: "Stefan Maric",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
