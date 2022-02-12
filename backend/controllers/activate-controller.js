import Jimp from 'jimp'
import UserService from '../services/user-service'
import path from 'path'
import UserDto from '../dtos/user-dto'

class ActivateController {
    async activate(req, res) {
        const {name, avatar} = req.body;
        if(!name || !avatar) {
            res.status(400).json({message:'All fields are required'})
        }


        // Image Bases
        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64')
        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

        try {
                const jimResp = await Jimp.read(buffer);
                jimResp.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`))
        }
        catch(err) {
            res.status(500).json({message: 'couldnt process image'})
        }

        //* updating user--------
        const userId = req.user._id

        try {
            const user = await UserService.findUser({_id: userId})
            if(!user) {
                res.status(404).json({message: 'user not found'})
            }
            user.activated = true;
            user.name = name
            user.avatar = `/storage/${imagePath}`
    
            user.save()
    
            res.json({userDto: new UserDto(user), auth: true},)

        }
        catch(err) {
            res.status(500).json({message: 'something went wrong'})
        }


    }
}

export default new ActivateController()