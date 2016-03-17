CREATE TABLE `USER_TB` (
    `user_id`   int(5)          NOT NULL ,
    `nick_name` varchar(15)     NULL ,
    `phone`     char(11)        NOT NULL ,
    `email`     varchar(50)     NULL ,
    `pwd`       varchar(50)     NOT NULL,
    PRIMARY KEY (`user_id`)
);
