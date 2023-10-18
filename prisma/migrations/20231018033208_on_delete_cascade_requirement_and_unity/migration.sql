-- DropForeignKey
ALTER TABLE `requirementunity` DROP FOREIGN KEY `RequirementUnity_requirementId_fkey`;

-- DropForeignKey
ALTER TABLE `requirementunity` DROP FOREIGN KEY `RequirementUnity_unityId_fkey`;

-- AddForeignKey
ALTER TABLE `RequirementUnity` ADD CONSTRAINT `RequirementUnity_requirementId_fkey` FOREIGN KEY (`requirementId`) REFERENCES `Requirement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequirementUnity` ADD CONSTRAINT `RequirementUnity_unityId_fkey` FOREIGN KEY (`unityId`) REFERENCES `Unity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
