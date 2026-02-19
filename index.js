const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  if (!events || events.length === 0) {
    return res.status(200).send("OK");
  }

  const event = events[0];

  if (event.type === "message" && event.message.type === "text") {
    const replyToken = event.replyToken;
    const userMessage = event.message.text;

    await axios.post(
      "https://api.line.me/v2/bot/message/reply",
      {
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: "คุณพิมพ์ว่า: " + userMessage
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
        }
      }
    );
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
