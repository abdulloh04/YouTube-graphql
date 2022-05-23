const GET_USERS = `
    select 
        user_id,
        user_name,
        user_password,
        user_img
    from users;
`


const ADD_USER = `
insert into users (user_name, user_password, user_img) values 
($1, $2, $3);
`


const GET_USER = `
    select 
        user_id,
        user_name,
        user_img
     from users 
    where user_name = $1 and user_password = $2;
`


export default {
    GET_USERS,
    ADD_USER,
    GET_USER
}