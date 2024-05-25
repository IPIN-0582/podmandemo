// deleteItem.js
const db = require('../persistence');
const redis = require('./redisClient');

module.exports = async (req, res) => {
    try {
        await db.removeItem(req.params.id);
        await redis.del('items'); // Clear cache
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
