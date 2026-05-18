const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lon, time } = req.query;

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=${time || "auto"}&temperature_unit=fahrenheit`
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch weather data"
    });
  }
});

module.exports = router;