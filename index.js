app.get("/stock", async (req, res) => {
  try {
    const url = "https://blox-fruits-stock.vercel.app/";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);

    let stock = [];

    $("body").find("*").each((i, el) => {
      const text = $(el).text().trim();

      if (
        text.includes("Fruit") ||
        text.includes("Rocket") ||
        text.includes("Dragon")
      ) {
        stock.push(text);
      }
    });

    res.json({ stock });

  } catch (err) {
    res.status(500).json({ error: "Scraper blocked or site changed" });
  }
});
