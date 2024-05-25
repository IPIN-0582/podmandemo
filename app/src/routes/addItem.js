// addItem.js
const db = require('../persistence');
const { v4: uuid } = require('uuid');
const redis = require('./redisClient');

module.exports = async (req, res) => {
    try {
        const item = {
            id: uuid(),
            name: req.body.name,
            completed: false,
        };

        await db.storeItem(item);
        await redis.del('items'); // Clear cache
        res.send(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
