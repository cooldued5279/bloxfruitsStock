const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/stock", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("https://fruityblox.com/stock", {
      waitUntil: "networkidle2"
    });

    const stock = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll("div"));
      return items
        .map(el => el.innerText)
        .filter(text =>
          text.includes("Fruit") ||
          text.includes("Dragon") ||
          text.includes("Leopard")
        );
    });

    await browser.close();

    res.json({ stock });

  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));
