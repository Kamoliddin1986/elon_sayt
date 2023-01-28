let dotenv = require('dotenv')
const express = require('express')
const router = require('./router/rout')
const fileupload = require('express-fileupload')


dotenv.config()
const app = express()
app.use(express.json())
app.use(fileupload())
app.use(router)
const port = process.env.PORT || 3333 


app.listen(port, () => {
    console.log(`${port} is running`);
})