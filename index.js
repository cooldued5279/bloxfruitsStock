const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/stock", async (req, res) => {
  try {
    const { data } = await axios.get("https://fruityblox.com/api/stock");

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch stock",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));
