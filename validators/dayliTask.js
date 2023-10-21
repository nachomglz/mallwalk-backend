const Place = require("../models/place");

const checkLocation = async (req, res, next) => {
  const { location } = req.body;
  const radius = 10;
  if (!location) {
    return res.status(400).json({
      ok: false,
      msg: "location is required",
    });
  }
  let places
  try {
    places = await Place.find({
        location: {
          $near: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], radius / 6378100] // 6378100 es el radio de la Tierra en metros
            },
            $maxDistance: radius
          }
        }
      });
  } catch (e) {
    return res.status(400).json({
        ok: false,
        msg: "location does not match",
      });
  }
  if(places.length == 0) {
    return res.status(400).json({
        ok: false,
        msg: "location does not match",
      });
  }
  console.log(places);
  res.locals.places = places
  next();
};

module.exports = {
  checkLocation,
};
