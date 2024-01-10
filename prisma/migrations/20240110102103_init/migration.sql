-- CreateTable
CREATE TABLE `AvailableTimes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AvailableTimes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
