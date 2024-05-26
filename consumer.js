const kafka = require('node-rdkafka');
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'kafka_lab',
  password: 'kafkapass',
  database: 'kafkadb'
});
const consumer = new kafka.KafkaConsumer({
  'group.id': 'my-consumer-group',
  'metadata.broker.list': 'localhost:9092',
}); 
const consume = async () => {
  try{
	mysqlConnection.connect();
	console.log('successfully connected to db');
  	await consumer.connect();
  	consumer.subscribe(['buy_topic']); 
	console.log('successfully connected to kafka');
	consumer.on('data', async (message) =>{
      	const buyData = JSON.parse(message.value.toString());
      	const buyIndex = buyData.buy_index;
      	const buyTime = new Date(buyData.buy_time * 1000).toISOString();

      	const query = "INSERT INTO orders (buy_index, buy_time) VALUES (?, ?)";
      	await mysqlConnection.query(query, [buyIndex, buyTime]);    
  	});
	consumer.consume();
  } catch (error) {
    console.error("Error in consuming or saving to database: ", error.message);
  }
};
consume().catch((err) => {
  console.error("Error in consumer: " + err.message);
});
