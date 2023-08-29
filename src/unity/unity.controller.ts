import { Body, Controller, Post, Res } from "@nestjs/common";

import { UnityService } from "./unity.service";
import { Response } from "express";
import { CreateDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Controller("unity")
export class UnityController {
    constructor(
        private readonly unityService: UnityService
    ) {}

    @Post("")
    async create(
        @Res() response : Response,
        @Body() createDto : CreateDto
    ) {
        try {
            const { message } = await this.unityService.create(createDto);

            response.status(200).json({
                message
            });
        } catch (error : any) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return response.status(400).json({
                        message: "Já existe uma unidade com esse nome."
                    });
                }
            }

            response.status(500).json({
                message: "Erro ao cadastrar unidade."
            });
        }
    }
}