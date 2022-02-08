import mongoose from 'mongoose'
import {DB_URL} from './config'

const DbConnect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('connection successful')
    }).catch((e) => {
        console.log('connetion failed')
    })
}

export default DbConnect;