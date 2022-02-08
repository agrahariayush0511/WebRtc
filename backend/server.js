import express from 'express'
import dotenv from 'dotenv'
import router from './routes'
import {PORT} from './config'
import DbConnect from './database'
// import cors from 'cors'


const app = express()
 
DbConnect();

// const corsOption = {
//     origin: ['http://localhost:3000'],
// }

// app.use(cors(corsOption))

app.use(express.json())

app.use(router);

app.get('/', (req, res) => {
    res.send('hello from express')
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})