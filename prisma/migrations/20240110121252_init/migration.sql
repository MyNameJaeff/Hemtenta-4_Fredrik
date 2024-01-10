/*
  Warnings:

  - A unique constraint covering the columns `[time]` on the table `AvailableTimes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `AvailableTimes_id_key` ON `AvailableTimes`;

-- CreateIndex
CREATE UNIQUE INDEX `AvailableTimes_time_key` ON `AvailableTimes`(`time`);
