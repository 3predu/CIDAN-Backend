-- CreateTable
CREATE TABLE `RequirementUnity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requirementId` INTEGER NOT NULL,
    `unityId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `RequirementUnity_requirementId_unityId_key`(`requirementId`, `unityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RequirementUnity` ADD CONSTRAINT `RequirementUnity_requirementId_fkey` FOREIGN KEY (`requirementId`) REFERENCES `Requirement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequirementUnity` ADD CONSTRAINT `RequirementUnity_unityId_fkey` FOREIGN KEY (`unityId`) REFERENCES `Unity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
