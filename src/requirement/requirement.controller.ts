import { Body, Controller, Post, Res } from "@nestjs/common";
import { RequirementService } from "./requirement.service";
import { Response } from "express";
import { CreateRequirementDto } from "./dto";
import { CreateRequirementResponse } from "./interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

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
}