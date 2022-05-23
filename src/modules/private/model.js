import query from './sql.js'
import db from '#pg'

// async function getUsers({ page, limit, search }) {
//     return await db(
//         query.GET_USERS,
//         (page - 1) * limit,
//         limit,
//         search
//     )
// }

async function addVideo({ video_name, video_type, video_size, user_id }) {
    return await db(query.ADD_VIDEO, video_name, video_type, video_size, user_id)
}


async function getVideo({ video_name, user_id, video_id }) {
    return await db(query.GET_VIDEO, video_name, user_id, video_id)
}

async function updateVideo({ video_name, video_id, user_id }) {
    return await db(query.UPDATE_VIDEO, video_name, video_id, user_id)
}

async function deleteVideo({ video_id, user_id }) {
    return await db(query.DELETE_VIDEO, video_id, user_id)
}

async function adminVideo({ user_id }) {
    return await db(query.ADMIN_VIDEO, user_id)
}


export default {
    getVideo,
    addVideo,
    updateVideo,
    deleteVideo,
    adminVideo
}