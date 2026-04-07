const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/stock", async (req, res) => {
  const url = "https://blox-fruits-stock.vercel.app/";

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let stock = [];

  $(".stock-item").each((i, el) => {
    stock.push($(el).text().trim());
  });

  res.json({ stock });
});

app.listen(3000, () => console.log("Running"));
