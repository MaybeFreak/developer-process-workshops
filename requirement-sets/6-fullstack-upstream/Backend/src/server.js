const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/places/:id", async (req, res) => {
  const response = await fetch(
    `https://storage.googleapis.com/coding-session-rest-api/${req.params.id}`
  );
  const data = await response.json();
  console.log(data);
  const body = {};
  body.name = data.addresses[0].business.identities[0].name;
  body.address = data.addresses[0].where;
  body.openingHours = data.opening_hours;

  return res.status(200).json({ data: body });
});

app.get("/places", (req, res) => {
  return res
    .status(200)
    .json({ places: ["GXvPAor1ifNfpF0U5PTG0w", "ohGSnJtMIC5nPfYRi_HTAg"] });
});

module.exports = app;
