const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')

//login package
const morgan = require('morgan')

//
require('express-async-errors')
// set dotenv
require('dotenv').config()


//set express.json()
app.use(express.json())



// set app
app.use(morgan('tiny'))
app.use('/',(req,res)=>{
    res.send('e-commerce')
})
// if not find the route, it will get into the middleware
//set middleware
app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)



// set database
const connectDB = require('./db/connect')

// set the port
const port = process.env.port || 3000

// listen the port
const start= async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`it is listening the port ${port}`);
        })
    
    } catch (error) {
        console.log(error);
    }
}
start() 