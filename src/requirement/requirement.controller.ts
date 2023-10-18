import { Body, Controller, Post, Res, Get, Query, InternalServerErrorException, Delete, Param } from "@nestjs/common";
import { RequirementService } from "./requirement.service";
import { Response } from "express";
import { CreateRequirementDto, GetManyRequirementsDto } from "./dto";
import { CreateRequirementResponse, DeleteRequirementResponse, GetManyRequirementsResponse } from "./interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

@Controller("requirements")
export class RequirementController {
    constructor(
        private readonly requirementService: RequirementService
    ) {}

    @Post("")
    async create(
        @Res() response: Response,
        @Body() createRequirementDto: CreateRequirementDto
    ): Promise<Response> {
        try {
            const createRequirementResponse: CreateRequirementResponse = await this.requirementService.create(createRequirementDto);

            return response.status(200).json({
                ...createRequirementResponse
            });
        } catch (error: any) {
            console.log(error);

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return response.status(400).json({
                        message: "Já existe um requisito com esse nome.",
                        severityWarning: "warning"
                    });
                }
            }

            return response.status(500).json({
                message: "Erro interno no servidor ao criar requisito.",
                severityWarning: "error"
            });
        }
    }

    @Get("")
    async getMany(
        @Res() response: Response,
        @Query() query: GetManyRequirementsDto
    ): Promise<Response> {
        try {
            const getManyRequirementsResponse: GetManyRequirementsResponse = await this.requirementService.getMany(query);

            return response.status(200).json({
                ...getManyRequirementsResponse
            });
        } catch (error: any) {
            if (error instanceof InternalServerErrorException) {
                return response.status(500).json({
                    message: error.message,
                    severityWarning: "error"
                });
            }

            return response.status(500).json({
                message: "Erro interno no servidor ao buscar requisitos.",
                severityWarning: "error"
            });
        }
    }

    @Delete(":id")
    async delete(
        @Res() response: Response,
        @Param("id") id: string
    ): Promise<Response> {
        try {
            const deleteRequirementResponse: DeleteRequirementResponse = await this.requirementService.delete(id);

            return response.status(200).json({
                ...deleteRequirementResponse
            });
        } catch (error: any) {
            console.log(error);

            if (error instanceof InternalServerErrorException) {
                return response.status(500).json({
                    message: error.message,
                    severityWarning: "error"
                });
            }

            return response.status(500).json({
                message: "Erro interno no servidor ao deletar requisito.",
                severityWarning: "error"
            });
        }
    }
}