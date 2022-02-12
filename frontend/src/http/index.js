import axios from 'axios';

const api = axios.create({
    baseUrl: process.env.REACT_APP_API_URL,
    // http://localhost:5000/api/send-otp
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
         Accept: "application/json",
    },
})


// list of all the endspoint 

export const sendOtp = (data) => api.post('/api/send-otp', data)

export const verifyOtp = (data) => api.post('/api/verify-otp', data)

export const activate = (data) => api.post('/api/activate', data)

export const logout = () => api.post('api/logout')


// Interceptors

api.interceptors.response.use((config) => {
    return config
},
 async (error) => {
     const originalRequest = error.config

     if(error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest.isRetry = true

        // console.log(process.env.REACT_APP_API_URL)

        try {
            await axios.get(
                `${process.env.REACT_APP_API_URL}/api/refresh`, 
            {
                withCredentials: true,
            }
        )
            return api.request(originalRequest);
        }
        catch(err) {
            console.log(err.message)
        }
     }
     throw error;
 })

export default api;