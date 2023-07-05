import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenVerifyResponse } from "./interface";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ) {}

    async verify(
        token : string
    ) : Promise<TokenVerifyResponse> {
        try {
            const validToken = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>("JWT_SECRET")
            });

            return {
                message: "Token is valid."
            }
        } catch (error) {
            throw error;
        }
    }
}