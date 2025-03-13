
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({
    path: './config/.env'
})
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});