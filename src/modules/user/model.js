import query from './sql.js'
import db from '#pg'

async function getUsers({ page, limit, search = '' }) {
    return await db(
        query.GET_USERS,
        (page - 1) * limit,
        limit,
        search
    )
}

async function getvideos({  page, limit, search = ''  }) {
    return await db(
        query.GET_VIDEOS,
        (page - 1) * limit,
        limit,
        search
    )
}

export default {
    getUsers,
    getvideos
}