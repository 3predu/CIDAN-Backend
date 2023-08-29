import { Module } from "@nestjs/common";

import { UnityController } from "./unity.controller";
import { UnityService } from "./unity.service";

@Module({
    controllers: [
        UnityController,
    ],
    providers: [
        UnityService,
    ],
})
export class UnityModule {}