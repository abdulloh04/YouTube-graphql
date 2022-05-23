const GET_USERS = `
    select 
        user_id,
        user_name,
        user_password,
        user_img
    from users;
`

const ADD_VIDEO = `
insert into videos (video_name, video_type, video_size, user_id) values 
($1, $2, $3, $4);
`


const GET_VIDEO = `
    select 
        video_id,
        video_name
    from videos 
    where video_id = $3 or video_name = $1 and user_id = $2;
`

const UPDATE_VIDEO = `
    update videos
    set video_name = $1::varchar
    where video_id = $2 and user_id = $3;
`

const DELETE_VIDEO = `
    delete from videos
    where video_id = $1 and user_id = $2;
`

const ADMIN_VIDEO = `
    select 
        video_id,
        video_name,
        video_type,
        user_id
    from videos 
    where user_id = $1;
`



export default {
    GET_USERS,
    ADD_VIDEO,
    GET_VIDEO,
    UPDATE_VIDEO,
    DELETE_VIDEO,
    ADMIN_VIDEO
}