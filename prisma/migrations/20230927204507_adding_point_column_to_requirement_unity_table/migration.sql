/*
  Warnings:

  - Added the required column `point` to the `RequirementUnity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requirementunity` ADD COLUMN `point` INTEGER NOT NULL;
