const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3Qzdm83IiwiYSI6ImNrdnRsMGRqZTFjM3EycHFwMWp0ZjVuMHAifQ.bJBpb056sIzKnXEmuDsTbQ&limit=1";
  request({ url, json: true }, (myError, { body }) => {
    if (myError) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
