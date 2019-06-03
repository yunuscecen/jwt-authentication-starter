const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { verifyToken } = require('./middleware/authMiddlewares');
dotenv.config();

// ## Require Routes
const authRoute = require('./routes/auth');

// ## Middlewares
app.use(express.json());
app.use(verifyToken);

// ## Route Middlewares
app.use('/', authRoute);


// Connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser : true }).then(() => {
    app.listen(3000);
}).catch(err => console.log(err));


