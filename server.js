import dotenv from 'dotenv'
import express from 'express'
import {read_file, write_file } from './api/api.js'

dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`${port} is running`);
})