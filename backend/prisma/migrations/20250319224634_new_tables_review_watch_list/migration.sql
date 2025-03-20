-- DropIndex
DROP INDEX `User_photo_key` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Review` (
    `movieId` INTEGER NOT NULL,
    `rate` DOUBLE NOT NULL DEFAULT 0.0,
    `comment` TEXT NOT NULL,
    `recommend` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`userId`, `movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WatchList` (
    `userId` VARCHAR(36) NOT NULL,
    `movieId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WatchList` ADD CONSTRAINT `WatchList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
