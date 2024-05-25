const db = require('../persistence');
const redisClient = require('./redisClient');

module.exports = async (req, res) => {
    const { id, name, completed } = req.body;
    if (!id || !name || completed === undefined) {
        return res.status(400).send('Bad request');
    }

    await db.addItem({ id, name, completed });
    
    // Optional: Add a corresponding Redis operation if needed
    await redisClient.set(`item-${id}`, JSON.stringify({ id, name, completed }));

    res.send('OK');
};
