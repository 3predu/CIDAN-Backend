import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto";
import { Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("signIn")
    async signIn(
        @Body() signInDto : SignInDto,
        @Res() response : Response
    ) : Promise<Response> {
        try {
            const { message, token } = await this.authService.signIn(signInDto);
    
            return response.status(200).json({
                message,
                token
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    return response.status(401).json({
                        message: "Usuário ou senha inválidos."
                    });
                }
            }

            return response.status(500).json({
                message: "Erro interno do servidor."
            });
        }
    }
}