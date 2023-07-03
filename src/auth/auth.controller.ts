import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto";
import { Response } from "express";
import { NotFoundError } from "@prisma/client/runtime";

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
            const { message } = await this.authService.signIn(signInDto);
    
            return response.status(200).json({
                message
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return response.status(401).json({
                    message: "Usuário ou senha inválidos."
                });
            }

            return response.status(500).json({
                message: "Erro interno do servidor."
            });
        }
    }
}