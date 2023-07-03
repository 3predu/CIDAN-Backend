import { Injectable } from "@nestjs/common";
import { SignInDto } from "./dto";
import { SignInResponse } from "./interface";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import * as crypto from "crypto-js";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService : PrismaService
    ) {}

    private hashPassword(
        password : string
    ) : string {
        const hashedPassword : string = crypto.SHA256(password).toString();

        return hashedPassword;
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
    
            return {
                message: "Usuário logado com sucesso."
            }
        } catch (error) {
            throw error;
        }
    }
}