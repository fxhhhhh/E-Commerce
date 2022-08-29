const express = require('express')
const app = express()


const port = process.env.port || 3000

const start= async ()=>{
    try {
        app.listen(port,()=>{
            console.log(`it is listening the port ${port}`);
        })
    
    } catch (error) {
        console.log(error);
    }
}
start()