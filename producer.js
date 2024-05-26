const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

const payloads = [
	{ topic: 'buy_topic' }
];

producer.on('ready', function () {
	async function sendToKafka (payloads, data) {
	  try{
	  	  await producer.connect();
		  await producer.send({
			  topic: topic,
			  messages: [{value: data}]
		  });
		  console.log('Data sent to Kafka topic successfully.');
	  }catch (error) {
	    console.error('Error sending data to Kafka:', error.message);
	  } finally {
	    await producer.disconnect();
	  }
	}
	module.exports = sendToKafka;
});
producer.on('error', function (err) {
	console.log(err);
});
