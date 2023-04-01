// const redis = require('redis');
// const client = redis.createClient();

// // Router-level middleware for Redis caching
// export const cache = (req, res, next) => {
//     const { id } = req.params;
//     client.get(id, (err, data) => {
//       if (err) throw err;
  
//       if (data !== null) {
//         // If data is present in Redis cache, return it
//         res.send(JSON.parse(data));
//       } else {
//         // If data is not present in Redis cache, call the next middleware to fetch it from the database
//         next();
//       }
//     });
//   };