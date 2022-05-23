import { finished } from 'stream/promises'
import JWT from '#helpers/jwt';
import path from 'path';
import fs from 'fs'
import model from './model.js'
import sha256 from "sha256"
import { AuthResponse, Response } from "../types/resolvers.js"


export default {
    Mutation: {
        register: async (_, { file: profile, password, user_name }, { agent, userIp }) => {

            const { createReadStream, filename } = await profile

            if(password.length < 4 || user_name.length < 3) {
                return Response(404, "Invalid lengtht username/password")
            }

            const fileName = Date.now() + filename.replace(/\s/g, '')

            const { mimetype } = await profile

            if (!['image/jpeg', 'image/x-png'].includes(mimetype)) return AuthResponse(404, "Invalid img format!")

            user_name = user_name.trim().toLowerCase()
            password = password.trim().toLowerCase()

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', fileName))
            createReadStream().pipe(out)
            await finished(out)


            await model.addUser({ user_name: fileName, user_password: sha256(password), user_img: fileName })

            let [user] = await model.getUser({ user_name, user_password: sha256(password) })

            return AuthResponse(
                200,
                "The user successfully registered!",
                user,
                JWT.sign({
                    userId: user.user_id, userIp, agent,
                })
            )
        },

        login: async (_, { user_name, password }, { agent, userIp }) => {

            let [user] = await model.getUser({ user_name, user_password: sha256(password) })

            if (!user) {
                return AuthResponse(404, "Wrong login/password")
            }

            return AuthResponse(
                200,
                "The user successfully registered!",
                user,
                JWT.sign({
                    userId: user.user_id, userIp, agent,
                })
            )

        }
    }

}