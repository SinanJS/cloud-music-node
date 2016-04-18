CREATE TABLE `USER_TB` (
    `user_id`   varchar(50)     NOT NULL ,
    `nick_name` varchar(15)     NULL ,
    `phone`     char(11)        NOT NULL ,
    `email`     varchar(50)     NULL ,
    `pwd`       varchar(50)     NOT NULL,
    `token`     varchar(200)    NULL,
    PRIMARY KEY (`user_id`)
);
create table song (
	song_id bigint(20) not null primary key auto_increment,
	sl_id bigint(20) not null default '0' comment '歌单id',
	song_name varchar(200),
	artist_id bigint(20),
	artist_name varchar(200) comment '歌手姓名',
	mp3url varchar (255),
	album_name varchar(200) comment '专辑名',
	album_id bigint(20),
	create_time timestamp default CURRENT_TIMEStamp,
	status int(3) not null default 0
)engine=INNODB

create table song_list(
	sl_id bigint(20) not null primary key auto_increment,
	user_id bigint(20) not null default '0',
	sl_name varchar(200) comment '歌单名称',
	description varchar(300),
	create_time timestamp default CURRENT_TIMEStamp,
	status int(3) not null default 0
)engine=INNODB
--触发器
create trigger delSong

after DELETE on song

for each row   #这句话在mysql是固定的

begin

UPDATE song_list set count=(SELECT COUNT(*) from song WHERE sl_id=old.sl_id);

end;


create trigger insertSong

after insert on song

for each row   #这句话在mysql是固定的

begin

UPDATE song_list set count=(SELECT COUNT(*) from song WHERE sl_id=new.sl_id);

end;