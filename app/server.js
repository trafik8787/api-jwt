const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const redis = new Redis({
    host: 'redis',
    port: 6379,
    password: 'secret_redis'
});

const API_URL = 'http://nginx/api/v1';
const API_URL_AUTH = 'http://nginx/api/v1/auth';

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {

    console.log(req.body);
    const { email, password } = req.body;
    //
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const response = await axios.post(`${API_URL_AUTH}/login`, {
            email,
            password
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get('/products', async (req, res) => {
    const cacheKey = 'products';
   const token = req.headers.authorization;
    // console.log(token);
    try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log("Returning cached data");
            res.json(JSON.parse(cachedData));
            return;
        }

        const response = await axios.get(`${API_URL}/products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
         });
        await redis.set(cacheKey, JSON.stringify(response.data), 'EX', 60); // Cache for 60 seconds

        res.json(response.data);
    } catch (error) {
        console.error("Error in /products route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




app.listen(4000, () => {
    console.log('Node.js API running on port 4000');
});
