/*
  Warnings:

  - You are about to drop the column `pointAmount` on the `requirement` table. All the data in the column will be lost.
  - Added the required column `maxPoint` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requirement` DROP COLUMN `pointAmount`,
    ADD COLUMN `maxPoint` INTEGER NOT NULL;
