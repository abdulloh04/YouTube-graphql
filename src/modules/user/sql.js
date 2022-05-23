const GET_USERS = `
    select 
        user_id,
        user_name,
        user_img
    from users
    where user_name ilike concat('%', $3::varchar, '%')
    offset $1 limit $2;
`

// select 
//    v.*,
//    u.user_name
// from videos v
// left join users u on v.user_id = u.user_id;


const GET_VIDEOS = `
    select 
        v.*,
        u.user_name
    from videos v
    left join users u on v.user_id = u.user_id
    where video_name ilike concat('%', $3::varchar, '%') 
    offset $1 limit $2;
`

export default {
    GET_USERS,
    GET_VIDEOS
}
// video_name, video_type, video_size, user_id

