
const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
require('dotenv').config({
    path: './config/.env'
})
app.use(express.json());
app.use(cors());
connectDatabase()
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server running`);
});