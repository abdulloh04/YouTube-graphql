import { finished } from 'stream/promises'
import JWT from '#helpers/jwt';
import path from 'path';
import fs from 'fs'
import model from './model.js'
import sha256 from "sha256"
import { AuthResponse, Response } from "../types/resolvers.js"


export default {
    Mutation: {

        addVideo: async (_, { file: profile, video_name }, { agent, userIp, userId }) => {

            const { createReadStream, filename } = await profile

            const fileName = Date.now() + filename.replace(/\s/g, '')

            video_name = video_name.trim().toLowerCase()

            const { mimetype: video_type } = await profile

            if ('video/mp4' != video_type) return Response(404, "Invalid video mime type")


            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', fileName))
            
            createReadStream().pipe(out)

            await finished(out)

            if (20000000 < out.bytesWritten) {
                fs.unlinkSync(path.join(process.cwd(), 'uploads', fileName))
                return Response(404, "Invalid video size, Max size 20mb")
            }

            await model.addVideo({ video_name: fileName, video_type, video_size: out.bytesWritten, user_id: userId })

            const [video] = await model.getVideo({ video_name, user_id: userId })

            return Response(
                200,
                "Created video",
                video
            )
        },

        changeVideo: async (_, { video_id, video_name }, { agent, userIp, userId }) => {

            video_id = video_id.trim()

            await model.updateVideo({ video_name, video_id, user_id: userId, })

            const [video] = await model.getVideo({ video_name, user_id: userId, video_id })

            if (!video) return Response(404, "Invalid")

            return Response(
                200,
                "Updated video name",
                video
            )
        },


        deleteVideo: async (_, { video_id }, { agent, userIp, userId }) => {

            video_id = video_id.trim()

            let video_name = ''

            const [video] = await model.getVideo({ video_name, user_id: userId, video_id })

            if (!video) return Response(404, "Invalid ID")

            await model.deleteVideo({ video_id, user_id: userId })

            return Response(
                200,
                "deleted video name",
                video
            )
        },
    },

    Query: {
        adminVideos: async (_, { }, { agent, userIp, userId }) => await model.adminVideo({ user_id: userId })

    }



}