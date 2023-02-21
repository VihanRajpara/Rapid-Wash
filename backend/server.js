const express=require('express')
const dotenv=require('dotenv').config()
// const colors=require('colors')
const session = require('express-session');
const cookieParser = require('cookie-parser');

const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port =process.env.PORT ||5000
connectDB()
const cors=require('cors')
const app=express()

app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000 // 1 hour
    }
}));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users' , require('./routes/userR'))
app.use('/api/washerman' , require('./routes/washermanR'))
app.use('/api/order' , require('./routes/orderR'))
app.use('/api/test' , require('./routes/testR'))
app.use(errorHandler)
app.listen(port,() =>console.log(`server start on port ${port}`))