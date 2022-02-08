import {OtpService, HashService} from '../services'
import userService from '../services/user-service'
import TokenService from '../services/token-service'
import UserDto from '../dtos/user-dto'

const authController = {
    async sendOtp(req, res) {
        //* logic
        const {phone} = req.body
        if(!phone) {
            res.status(400).json({message: 'phone field is required!'})
        }

        const otp = await OtpService.generateOtp();

        //* Hash otp

        const ttl = 1000 * 60 * 5
        const expires = Date.now() + ttl
        const data = `${phone}.${otp}.${expires}`

        const hash = HashService.hashOtp(data);

        //* sending otp by sms-----------
        //* ------------------

        try{
            // await OtpService.sendBySms(phone, otp)
            return res.json({
                hash:`${hash}.${expires}`,
                phone,
                otp
            })
        }
        catch(err) {
            console.log(err)
            res.status(500).json({message:'message sending failed'})
        }

        res.json({hash, otp})
    },

    async verifyOtp(req, res){
        //* logic

        const {otp, hash, phone} = req.body;

        if(!otp || !hash || !phone){
            res.status(500).json({message: 'All fields are required'})

        }

        const [hashedOtp, expires] = hash.split('.')
        if(Date.now() > +expires){
            res.status(400).json({message: 'OTP expired'})
        }
        const data = `${phone}.${otp}.${expires}`
        const isValid = OtpService.verifyOtp(hashedOtp, data)

        if(!isValid) {
            res.status(400).json({message: 'Invalid OTP'})
        }

        let user;

        try {
            user = await userService.findUser({phone: phone})
            if(!user) {
              user =  await userService.createUser({phone:phone})
              console.log(user)
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).json({message: 'Db error'})
        }

        //* Token creating---------
        //* ---------------
        const {accessToken, refreshToken} = TokenService.generateTokens({
            _id: user._id,
            activated: false,
        })

        
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        })

        const userDto = new UserDto(user)

         res.json({accessToken, userDto})

    }
}

export default authController