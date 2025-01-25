import { Kafka, Producer, Consumer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'], // Replace with your Kafka broker URL
});

const producer: Producer = kafka.producer();
const consumer: Consumer = kafka.consumer({ groupId: 'my-group' });

// export const connectKafka = async (): Promise<void> => {
//   try {
//     console.log('🔌 Connecting to Kafka...');
//     await producer.connect();
//     console.log('✅ Kafka Producer connected');

//   await producer.send({
//     topic: 'UserRegistered',
//     messages: [{ value: 'Test message' }],
//   });

//   console.log('Message sent successfully');

//     await consumer.connect();

//     await consumer.subscribe({ topic: 'UserRegistered', fromBeginning: true });

//     console.log('Consumer connected and subscribed');

//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//           console.log(`Received message: ${message.value?.toString()}`);
//         },
//       });
//     console.log('✅ Kafka Consumer connected');
//     console.log('Connected to Kafka');
//   } catch (error) {
//     console.error('❌ Error connecting to Kafka:', error);
//   }
// };

export const connectKafka = async (): Promise<void> => {
    try {
      console.log('🔌 Connecting to Kafka...');
      await producer.connect();
      console.log('✅ Kafka Producer connected');
  
      await producer.send({
        topic: 'UserRegistered',
        messages: [{ value: 'Test message' }],
      });
  
      console.log('Message sent successfully');
  
      let attempts = 0;
      const maxAttempts = 5;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  
      while (attempts < maxAttempts) {
        try {
          await consumer.connect();
          console.log('✅ Kafka Consumer connected');
          break;
        } catch (error) {
          attempts++;
          console.error(`❌ Consumer connect attempt ${attempts} failed:`, error);
          if (attempts >= maxAttempts) throw new Error('Failed to connect consumer');
          await delay(2000 * attempts); // Exponential backoff
        }
      }
  
      await consumer.subscribe({ topic: 'UserRegistered', fromBeginning: true });
      console.log('Consumer connected and subscribed');
  
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(`Received message: ${message.value?.toString()}`);
        },
      });
  
      console.log('Connected to Kafka');
    } catch (error) {
      console.error('❌ Error connecting to Kafka:', error);
    }
  };
  



export const disconnectKafka = async (): Promise<void> => {
    try {
        await producer.disconnect();
        await consumer.disconnect();
        console.log('🔌 Disconnected from Kafka');
    } catch (error) {
        console.error('❌ Error disconnecting from Kafka:', error);
    }
};

export { producer, consumer };
