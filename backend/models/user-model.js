import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    activated:{
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema, 'users')