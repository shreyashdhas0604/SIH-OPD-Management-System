// import Redis from 'ioredis';

// const client = new Redis({
//   host: 'localhost',
//   port: 6379,
// });

// client.on('error', (err) => {
//   console.error('Redis Client Error', err);
// });

// export { client };

import { createClient, RedisClientType } from 'redis';

// Create a Redis client with custom configuration
const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'redis', // Explicitly use the IPv4 address to avoid potential ::1 issues
    port: 6379,        // Default Redis port
  },
});

// Event listeners for Redis client
redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redisClient.on('ready', () => {
  console.log('✅ Redis client is ready to use');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

redisClient.on('end', () => {
  console.log('❌ Redis client disconnected');
});

// Function to initialize the Redis client
export const initializeRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log('🔌 Redis connection established successfully');
  } catch (err) {
    console.error('❌ Failed to initialize Redis:', err);
    process.exit(1); // Exit the application if Redis connection fails
  }
};

// Function to disconnect the Redis client
export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.disconnect();
    console.log('🔌 Redis connection closed successfully');
  } catch (err) {
    console.error('❌ Failed to disconnect Redis:', err);
  }
};

// Export the Redis client for use throughout the application
export default redisClient;

