import { UserInputError } from 'apollo-server-express'
import { USER_CONFIG } from '#config/index'
import model from './model.js'

export default {
    Query: {
        users: async (_, { pagination, search, sort }) => {
            const sortKey = Object.keys(sort || {})[0]

            return await model.getUsers({
                page: pagination?.page || USER_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || USER_CONFIG.PAGINATION.LIMIT,
                search,
            })
        },

        videos: async (_, { pagination, search }) => {

            return await model.getvideos({
                page: pagination?.page || USER_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || USER_CONFIG.PAGINATION.LIMIT,
                search,
            })
        }



    },

    Videos: {
        view: parameter => {
            return process.HOST + '/view/' + parameter.video_name
        },

        download : parameter => {
            return process.HOST + '/download/' + parameter.video_name
        },
    },

    User: {
        img : parameter => {
            console.log(parameter.img);
            return process.HOST + '/view/' + parameter.user_img
        },
    }




}