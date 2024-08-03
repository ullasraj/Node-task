import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-client-id',
    brokers: ['kafka:9092'], // Use the container name
  });
  
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

const produceMessage = async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'my-topic',
      messages: [{ value: 'Hello KafkaJS!' }],
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Failed to send message:', error);
  } finally {
    await producer.disconnect();
  }
};

produceMessage();
