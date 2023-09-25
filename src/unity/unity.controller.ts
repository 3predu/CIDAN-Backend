import { Body, Controller, Post, Res, Get, Query, Param, InternalServerErrorException } from "@nestjs/common";

import { UnityService } from "./unity.service";
import { Response } from "express";
import { CreateDto, GetManyDto } from "./dto";
import { NotFoundError, PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GetByIdResponse, GetManyResponse } from "./interface";

@Controller("unity")
export class UnityController {
    constructor(
        private readonly unityService: UnityService
    ) { }

    @Post("")
    async create(
        @Res() response: Response,
        @Body() createDto: CreateDto
    ): Promise<Response> {
        try {
            const { message } = await this.unityService.create(createDto);

            return response.status(200).json({
                message
            });
        } catch (error: any) {
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
        @Res() response: Response,
        @Query() getManyDto: GetManyDto
    ): Promise<Response> {
        try {
            const getManyUnitiesResponse: GetManyResponse = await this.unityService.getMany(getManyDto);

            return response.status(200).json({
                ...getManyUnitiesResponse
            });
        } catch (error: any) {
            return response.status(500).json({
                message: "Erro ao buscar unidades."
            });
        }
    }

    @Get(":id")
    async getById(
        @Res() response: Response,
        @Param("id") id: string
    ): Promise<Response> {
        try {
            const getUnityByIdResponse: GetByIdResponse = await this.unityService.getById(id);

            return response.status(200).json({
                ...getUnityByIdResponse
            });
        } catch (error: any) {
            console.log(error);

            if (error instanceof InternalServerErrorException) {
                return response.status(500).json({
                    message: error.message,
                    severityWarning: "error"
                });
            } else if (error instanceof NotFoundError) {
                return response.status(404).json({
                    message: "Unidade não encontrada.",
                    severityWarning: "warning"
                });
            }

            return response.status(500).json({
                message: "Erro ao buscar unidade.",
                severityWarning: "error"
            });
        }
    }
}