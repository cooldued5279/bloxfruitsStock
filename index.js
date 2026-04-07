const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/stock", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://fruityblox.com/_next/data/build-id/stock.json"
    );

    res.json(data.pageProps);

  } catch (err) {
    res.status(500).json({
      error: "Failed",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));
