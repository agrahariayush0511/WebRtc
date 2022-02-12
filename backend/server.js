import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'
import {PORT} from './config'
import DbConnect from './database'
import cookieParser from 'cookie-parser'
// import cors from 'cors'


const app = express()
 
DbConnect();

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
}

app.use(cors(corsOption))
app.use(cookieParser())

app.use('/storage', express.static('storage'))

app.use(express.json({limit: '15mb'}))

app.use(router);

app.get('/', (req, res) => {
    res.send('hello from express')
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})