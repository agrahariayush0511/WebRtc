import axios from 'axios';

const api = axios.create({
    baseUrl: process.env.REACT_APP_API_URL,
    // http://localhost:5000/api/send-otp
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
    
})


// list of all the endspoint 

export const sendOtp = (data) => api.post('/api/send-otp', data)

export const verifyOtp = (data) => api.post('/api/verify-otp', data)

export default api;