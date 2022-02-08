import crypto from 'crypto'
import twilio from 'twilio'
import {SMS_SID, SMS_AUTH_TOKEN, SMS_FROM_NUMBER,} from '../config'
import HashService from './hash-service'

const sendSms = twilio(SMS_SID, SMS_AUTH_TOKEN, {
    lazyLoading: true
})

class OtpService {


    // * generating Otp---------
    // *------------
    generateOtp() {
        const otp = crypto.randomInt(1000, 9999)
        return otp;
    }

    // * sending Otp -------- 
    // *-----------------
    async sendBySms(phone, otp) {
        return await sendSms.messages.create({
            to:phone,
            from: SMS_FROM_NUMBER,
            body: `Your codersHouse OTP is ${otp}`
        }) 
    }

        // * verifying Otp -------- 
    // *-----------------

    verifyOtp(hashedOtp, data) {
        let computedHash = HashService.hashOtp(data)
        return computedHash === hashedOtp 
    }
}

export default new OtpService();