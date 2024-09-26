import Redis from 'ioredis';

const client = new Redis({
  host: 'localhost',
  port: 6379,
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export { client };

