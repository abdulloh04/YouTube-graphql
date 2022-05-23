


create database youtube;

\c youtube;


create extension if not exists "uuid-ossp";


drop table if exists users;
create table users (
    user_id uuid default uuid_generate_v4() primary key,
    user_name character varying(255) not null unique,
    user_password text not null,
    user_img text not null
);


drop table if exists videos;
create table videos (
    video_id uuid default uuid_generate_v4() primary key,
    video_name character varying(255) not null,
    video_type character varying(255) not null,
    video_size character varying(255) not null,
    video_date timestamptz default current_timestamp,
    user_id uuid not null REFERENCES users(user_id)  
);

