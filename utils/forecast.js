const request = require("request");

const forecast = (lon, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0ee321abdbfd074b337fcb62504c8071&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(lon);
  request({ url, json: true }, (myError, { body }) => {
    if (myError) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. The humidity is " + 
          body.current.humidity +
          "%. Enjoy your day!"
      );
    }
  });
};
module.exports = forecast;
