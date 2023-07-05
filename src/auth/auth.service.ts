import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto";
import { SignInResponse } from "./interface";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import * as crypto from "crypto-js";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService : PrismaService,
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ) {}

    private hashPassword(
        password : string
    ) : string {
        const hashedPassword : string = crypto.SHA256(password).toString();

        return hashedPassword;
    }

    private async generateToken(
        user : User
    ) : Promise<string> {
        const { id, login, name } = user;

        const payload : { id : number, login : string, name : string } = {
            id,
            login,
            name
        }

        const options : { expiresIn : string, secret : string } = {
            expiresIn: "2d",
            secret: this.configService.get<string>("JWT_SECRET")
        }

        const token : string = await this.jwtService.signAsync(payload, options);

        return token;
    }

    async signIn(
        signInDto : SignInDto
    ) : Promise<SignInResponse> {
        try {
            const { login, password } = signInDto;

            const hashedPassword : string = this.hashPassword(password);
    
            const user : User = await this.prismaService.user.findFirstOrThrow({
                where: {
                    AND: [
                        {
                            login: {
                                equals: login
                            }
                        },
                        {
                            password: {
                                equals: hashedPassword
                            }
                        }
                    ]
                }
            });

            const token : string = await this.generateToken(user);
    
            return {
                message: "Usuário logado com sucesso.",
                token
            }
        } catch (error) {
            throw error;
        }
    }
}