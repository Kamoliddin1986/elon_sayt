let dotenv = require('dotenv')
const express = require('express')
const router = require('./router/rout')


dotenv.config()
const app = express()
app.use(express.json())
app.use(router)
const port = process.env.PORT || 3333 

app.listen(port, () => {
    console.log(`${port} is running`);
})