var redis = require('redis');
var client = redis.createClient({
    url: 'redis://default:admin@redis:6379/'
  });
client.connect();
module.exports = client;