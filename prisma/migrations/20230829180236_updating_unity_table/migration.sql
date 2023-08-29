/*
  Warnings:

  - You are about to drop the column `nome` on the `unity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Unity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Unity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Unity_nome_key` ON `unity`;

-- AlterTable
ALTER TABLE `unity` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Unity_name_key` ON `Unity`(`name`);
