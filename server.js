// server.js 中的生產者會將消息發送到 buy_topic 主題。

const express = require('express');
const kafka = require('kafka-node');
const app = express();
const port = 3000;

const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/buy', (req, res) => {
  const payloads = [
    { topic: 'buy_topic', messages: 'Buy Now', partition: 0 }
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Message sent to Kafka');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

producer.on('ready', () => {
  console.log('Producer is ready');
});

producer.on('error', (err) => {
  console.log(err);
});