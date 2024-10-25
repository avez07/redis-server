const express = require('express');
const Redis = require('ioredis');
const app = express();
const redis = new Redis();

app.get('/', async (req, res) => {
    try {
        const data = [];
        const Backupdata = await redis.get('data');
        
        if (Backupdata) {
            // If backup data exists, send it and return early to avoid sending another response
            return res.json(JSON.parse(Backupdata));
        }

        // If no backup data exists, generate the data and store it in Redis
        for (let i = 0; i < 100000; i++) {
            data.push({
                id: i,
                name: `name${i}`,
                address1: 'byculla',
                address2: 'byculla',
                address3: 'byculla',
                address4: 'byculla',
                address5: 'byculla',
                address6: 'byculla',
                address7: 'byculla',
                address8: 'byculla',
                address9: 'byculla',
                address10: 'byculla',
                address11: 'byculla',
                address12: 'byculla',
                address13: 'byculla',
                address14: 'byculla',
                address15: 'byculla',
                address16: 'byculla',
                address17: 'byculla',
            });
        }

        await redis.set('data', JSON.stringify(data));
        await redis.expire('data', 30);
        
        // Send the newly generated data
        res.status(200).json(data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
