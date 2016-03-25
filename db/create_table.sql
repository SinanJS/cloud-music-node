CREATE TABLE `USER_TB` (
    `user_id`   varchar(50)     NOT NULL ,
    `nick_name` varchar(15)     NULL ,
    `phone`     char(11)        NOT NULL ,
    `email`     varchar(50)     NULL ,
    `pwd`       varchar(50)     NOT NULL,
    `token`     varchar(200)    NULL,
    PRIMARY KEY (`user_id`)
);
