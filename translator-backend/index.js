const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  try {
    const english = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "auto",
        tl: "en",
        dt: "t",
        q: text
      }
    });

    const french = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "auto",
        tl: "fr",
        dt: "t",
        q: text
      }
    });

    res.json({
      english: english.data[0][0][0],
      french: french.data[0][0][0]
    });

  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(8000, () => console.log("Backend running on port 8000"));