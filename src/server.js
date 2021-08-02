const express = require('express');
const app = express();
const restaurentRouter = require('./app/routes/restaurent');
const menuRouter = require('./app/routes/menu');
const customerRouter = require('./app/routes/customer');
const {PORT} = require('./config/config');
const ErrorHandler = require('./app/errors/ErrorHandler');

const db = require('./config/db')();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/restaurent',restaurentRouter);
app.use('/menu',menuRouter);
app.use('/customer',customerRouter);

app.use((req, res, next) => {
    return res.json({ message: 'page not found!'});
});

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`);
})

