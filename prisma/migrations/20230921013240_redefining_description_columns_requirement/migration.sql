/*
  Warnings:

  - You are about to drop the column `descript` on the `requirement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `requirement` DROP COLUMN `descript`,
    ADD COLUMN `description` LONGTEXT NULL;
