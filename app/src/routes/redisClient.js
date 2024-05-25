const redis = require('redis');
const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect().then(() => console.log('Connected to Redis'));

module.exports = client;
