insert into users (user_name, user_password, user_img) values 
('abror', '123456', 'jasfnjasnbfha.jpg'),
('diyor', '123456',  'sdnajdnajsn.png'),
('abdurahmon', '123456',  'dnasdnasd.jpg');

insert into videos (video_name, video_type, user_id) values
('nimaduram.mp4', 'mp4', '7294bb0d-ae99-425c-a705-6858f7348fe4');




select 
    u.*,
    v.user_id id
from users u 
left join videos v on u.user_id = v.user_id;