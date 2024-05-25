// getItems.js
const db = require('../persistence');
const redis = require('./redisClient');

module.exports = async (req, res) => {
    try {
        const cachedItems = await redis.get('items');
        if (cachedItems) {
            return res.send(JSON.parse(cachedItems));
        }

        const items = await db.getItems();
        await redis.set('items', JSON.stringify(items), 'EX', 3600); // Cache for 1 hour
        res.send(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
