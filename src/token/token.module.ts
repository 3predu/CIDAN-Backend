import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        JwtModule,
        ConfigModule
    ],
    controllers: [
        TokenController
    ],
    providers: [
        TokenService
    ]
})
export class TokenModule {}