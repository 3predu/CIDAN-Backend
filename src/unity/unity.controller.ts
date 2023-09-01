import { Body, Controller, Post, Res, Get, Query } from "@nestjs/common";

import { UnityService } from "./unity.service";
import { Response } from "express";
import { CreateDto, GetManyDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GetManyResponse } from "./interface";

@Controller("unity")
export class UnityController {
    constructor(
        private readonly unityService: UnityService
    ) {}

    @Post("")
    async create(
        @Res() response : Response,
        @Body() createDto : CreateDto
    ) : Promise<Response> {
        try {
            const { message } = await this.unityService.create(createDto);

            return response.status(200).json({
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

            return response.status(500).json({
                message: "Erro ao cadastrar unidade."
            });
        }
    }

    @Get("")
    async getMany(
        @Res() response : Response,
        @Query() getManyDto : GetManyDto
    ) : Promise<Response> {
        try {
            const getManyUnitiesResponse : GetManyResponse = await this.unityService.getMany(getManyDto);

            return response.status(200).json({
                ...getManyUnitiesResponse
            });
        } catch (error : any) {
            return response.status(500).json({
                message: "Erro ao buscar unidades."
            });
        }
    }
}