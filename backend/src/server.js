const express = require('express');
const connectDB = require('./config/db-config');
// const userController = require('./controllers/userController');
const routes=require('./routes/route');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(express.json());
app.use(cors())
app.use('/', routes);
app.use(cors());
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
});

module.exports = app;