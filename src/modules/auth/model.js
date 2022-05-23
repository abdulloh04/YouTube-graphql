import query from './sql.js'
import db from '#pg'

async function getUsers({ page, limit, search }) {
    return await db(
        query.GET_USERS,
        (page - 1) * limit,
        limit,
        search
    )
}

async function addUser({ user_name, user_password, user_img }) {
    return await db(query.ADD_USER, user_name, user_password, user_img)
}


async function getUser({user_name, user_password}){
    return await db(query.GET_USER, user_name, user_password)
}



export default {
    getUsers,
    addUser,
    getUser
}