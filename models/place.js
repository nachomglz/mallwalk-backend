const { Schema, model } = require("mongoose");

const PlaceSchema = Schema({
  name: {
    type: Schema.Types.String,
    required: [true, "Name is required"],
  },
  location: {
    type: [Schema.Types.Number],
    required: [true, "Location is required"],
  },
  img: {
    type: Schema.Types.String,
    required: [true, "Img is required"],
  },
  status: {
    type: Schema.Types.Number,
    default: 0,
  },
  reward: {
    type: Schema.Types.Number,
    default: 5,
  },
  date: {
    type: Schema.Types.String,
    default: () => new Date().toISOString().split("T")[0],
  },
  category: [
    {
      type: Schema.Types.String,
    },
  ],
});

const placesData = [
  {
    name: "Zona de juegos para niños",
    location: [36.739472312969184, -4.552233984469687],
    img: "image1.jpg",
    status: 0,
    date: "2023-10-21",
    category: ["technologies", "laptops"],
  },
  {
    name: "Tienda de helados Sweat treats",
    location: [36.739472312969184, -4.552233984469687],
    img: "image2.jpg",
    status: 1,
    date: "2023-10-22",
    category: ["Restaurant", "Food", "italian"],
  },
  {
    name: "Fuente de agua",
    location: [36.739472312969184, -4.552233984469687],
    img: "image3.jpg",
    status: 0,
    date: "2023-10-23",
    category: ["shoes"],
  },
  {
    name: "Extintor",
    location: [36.739472312969184, -4.552233984469687],
    img: "image4.jpg",
    status: 1,
    date: "2023-10-24",
    category: ["sport", "clothes"],
  },
];

module.exports = model("Place", PlaceSchema);
