import {consumer} from './kafkaClient';

export const consumePatientRegisteredEvents = async (): Promise<void> => {
    try {
      await consumer.subscribe({ topic: 'UserRegistered', fromBeginning: true });
  
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const event = JSON.parse(message.value?.toString() || '{}');
          console.log(`Received message on topic ${topic}:`, event);
  
          // Process the event (e.g., send notifications)
        },
      });
    } catch (error) {
      console.error('Error consuming Kafka events:', error);
    }
  };


export const consumeOPDRegisteredEvents = async (): Promise<void> => {
    try {
        await consumer.subscribe({ topic: 'OPDRegistered', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const event = JSON.parse(message.value?.toString() || '{}');
                console.log(`Received message on topic ${topic}:`, event);

                // Process the event (e.g., send notifications)
            },
        });
    } catch (error) {
        console.error('Error consuming Kafka events:', error);
    }
};

consumeOPDRegisteredEvents();
consumePatientRegisteredEvents();