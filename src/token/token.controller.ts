import { Controller, Get, Headers, Res } from "@nestjs/common";
import { TokenService } from "./token.service";
import { Response } from "express";

@Controller("token")
export class TokenController {
    constructor(
        private readonly tokenService: TokenService
    ) {}

    @Get("verify")
    async verify(
        @Headers("authorization") authorization : string,
        @Res() response : Response
    ) : Promise<Response> {
        try {
            const token : string = authorization.replace("Bearer ", "");

            if (!token) {
                return response.status(401).json({
                    message: "Token is required."
                });
            }

            const { message } = await this.tokenService.verify(token);

            return response.status(200).json({
                message
            });
        } catch (error) {
            if (error instanceof Object) {
                return response.status(401).json({
                    message: "Token is invalid."
                });
            }

            return response.status(500).json({
                message: "Unexpected error occurred."
            });
        }
    }
}