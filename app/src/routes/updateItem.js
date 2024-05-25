// updateItem.js
const db = require('../persistence');
const redis = require('./redisClient');

module.exports = async (req, res) => {
    try {
        await db.updateItem(req.params.id, {
            name: req.body.name,
            completed: req.body.completed,
        });
        const item = await db.getItem(req.params.id);
        await redis.del('items'); // Clear cache
        res.send(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
