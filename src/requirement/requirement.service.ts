import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRequirementResponse, GetManyRequirementsResponse } from "./interface";
import { CreateRequirementDto, GetManyRequirementsDto } from "./dto";
import { Requirement } from "@prisma/client";

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
                    ...(createRequirementDto.maxPoint !== 0 && { maxPoint: createRequirementDto.maxPoint })
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

    async getMany(getManyRequirementsDto: GetManyRequirementsDto): Promise<GetManyRequirementsResponse> {
        try {
            const maxPoint: number = parseInt(getManyRequirementsDto.maxPoint);

            const maxPointValid: boolean = !isNaN(maxPoint) && maxPoint >= 0;

            if (!maxPointValid) {
                throw new InternalServerErrorException("A quantidade de pontos do requisito deve ser um número maior ou igual a zero.");
            }

            const requirements: Requirement[] = await this.prismaService.requirement.findMany({
                where: {
                    ...(getManyRequirementsDto.name !== "" && { name: getManyRequirementsDto.name }),
                    ...(getManyRequirementsDto.description !== "" && { description: getManyRequirementsDto.description }),
                    ...(maxPointValid && maxPoint !== 0 && { maxPoint: maxPoint })
                }
            });

            return {
                message: "Requisitos buscados com sucesso.",
                severityWarning: "success",
                requirements
            }
        } catch (error: any) {
            throw error;
        }
    }
}