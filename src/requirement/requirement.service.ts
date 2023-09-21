import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRequirementResponse } from "./interface";
import { CreateRequirementDto } from "./dto";

@Injectable()
export class RequirementService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(createRequirementDto: CreateRequirementDto): Promise<CreateRequirementResponse> {
        try {
            await this.prismaService.requirement.create({
                data: {
                    name: createRequirementDto.name,
                    ...(createRequirementDto.description !== "" && { description: createRequirementDto.description }),
                    ...(createRequirementDto.pointAmount !== 0 && { pointAmount: createRequirementDto.pointAmount })
                }
            });

            return {
                message: "Requisito criado com sucesso.",
                severityWarning: "success"
            }
        } catch (error) {
            throw error;
        }
    }
}