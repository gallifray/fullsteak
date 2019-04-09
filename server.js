const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const colors = require('colors');
const config = require('config')
const dotenv = require('dotenv');
const path = require('path');

// ============== Setup  ==============
dotenv.config();
const dbConfig = config.get('dbConfig')
const port = process.env.PORT || 4444
app.use(bodyParser.json());


// ========= Mongoose connect ==========
mongoose.connect(dbConfig.mongoURI,
    { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if (err) throw err;
        console.log("[MONGODB] Connected to database".green)
    });


// ======== Routes Declaration =========
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// =========== Server Launch ===========
app.listen(port, () => console.log(`[EXPRESS] Server is running on http://localhost:${port}`.cyan));