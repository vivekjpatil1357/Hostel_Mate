const express = require('express');
const routes=require('./routes/route');
const app = express();
const PORT = 5000;
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.use('/', routes);

// server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;