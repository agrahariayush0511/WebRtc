import jwt from 'jsonwebtoken'
import {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} from '../config'
import refreshSchema from '../models/refresh-model'

class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign(payload,JWT_ACCESS_SECRET , {
            expiresIn: '5s'
        })

        const refreshToken = jwt.sign(payload,JWT_REFRESH_SECRET , {
            expiresIn: '1y'
        })

        return {accessToken, refreshToken}
    }

    async storeRefreshToken (token, userId) {
        try {
            const res = await refreshSchema.create({
                token, userId
            })
        }
        catch(err){
            console.log(err.message)
        }
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, JWT_ACCESS_SECRET)
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, JWT_REFRESH_SECRET)        
    }

    async findRefreshToken(userId, refreshToken) {
        return await refreshSchema.findOne({
            userId: userId,
             token: refreshToken
            })
    }


    async updateRefreshToken(userId, refreshToken) {
        return await refreshSchema.updateOne({userId}, {token: refreshToken})
    }

    async removeToken(refreshToken) {
        return await refreshSchema.deleteOne({token: refreshToken})
    }

}

export default new TokenService();