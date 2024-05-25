const db = require('../persistence');
const redisClient = require('./redisClient');

module.exports = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('Bad request');
    }

    await db.deleteItem(id);
    
    // Optional: Add a corresponding Redis operation if needed
    await redisClient.del(`item-${id}`);

    res.send('OK');
};
