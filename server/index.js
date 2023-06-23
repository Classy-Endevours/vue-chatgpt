
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(cors())
app.get('/', (req, res) => {
    res.json({ message: 'success' })
});

app.listen(PORT, (error) => {
    if (!error) { 
        console.log("Server is Successfully Running, and App is listening on port " + PORT) 
    } else { 
        console.log("Error occurred, server can't start", error); 
    }
});