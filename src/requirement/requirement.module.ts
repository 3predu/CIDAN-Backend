import { Module } from "@nestjs/common";
import { RequirementController } from "./requirement.controller";
import { RequirementService } from "./requirement.service";

@Module({
    controllers: [
        RequirementController
    ],
    providers: [
        RequirementService
    ]
})
export class RequirementModule {}