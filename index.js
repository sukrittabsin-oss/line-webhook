const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const LINE_CHANNEL_ACCESS_TOKEN = "ใส่ Channel Access Token ตรงนี้";

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  if (events.length > 0) {
    const event = events[0];

    if (event.type === 'message' && event.message.type === 'text') {

      const userMessage = event.message.text;
      let replyText = "";

      // เงื่อนไขตอบกลับ
      if (userMessage === "สวัสดี") {
        replyText = "สวัสดีครับ 😊";
      } 
      else if (userMessage === "ช่วยด้วย") {
        replyText = "มีอะไรให้ช่วยครับ?";
      } 
      else {
        replyText = "พิมพ์ว่า 'สวัสดี' หรือ 'ช่วยด้วย'";
      }

      await axios.post('https://api.line.me/v2/bot/message/reply',
        {
          replyToken: event.replyToken,
          messages: [
            {
              type: 'text',
              text: replyText
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
          }
        }
      );
    }
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Webhook is working!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
