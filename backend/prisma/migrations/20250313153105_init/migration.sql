-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `photo` VARCHAR(500) NULL,
    `nickname` VARCHAR(50) NULL DEFAULT 'annonymous',
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(70) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_photo_key`(`photo`),
    UNIQUE INDEX `User_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
