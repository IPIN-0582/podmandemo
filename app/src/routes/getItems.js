const db = require('../persistence');

module.exports = async (req, res) => {
    // Sử dụng Redis để kiểm tra cache trước khi truy vấn database
    const redisClient = require('./redisClient');

    const cachedItems = await redisClient.get('items');
    if (cachedItems) {
        return res.json(JSON.parse(cachedItems));
    }

    const items = await db.getItems();
    await redisClient.set('items', JSON.stringify(items));
    res.json(items);
};
