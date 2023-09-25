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

    async getMany(getManyRequirementsDto: GetManyRequirementsDto): Promise<GetManyRequirementsResponse> {
        try {
            const pointAmount: number = parseInt(getManyRequirementsDto.pointAmount);

            const pointAmountValid: boolean = !isNaN(pointAmount) && pointAmount >= 0;

            if (!pointAmountValid) {
                throw new InternalServerErrorException("A quantidade de pontos do requisito deve ser um número maior ou igual a zero.");
            }

            const requirements: Requirement[] = await this.prismaService.requirement.findMany({
                where: {
                    ...(getManyRequirementsDto.name !== "" && { name: getManyRequirementsDto.name }),
                    ...(getManyRequirementsDto.description !== "" && { description: getManyRequirementsDto.description }),
                    ...(pointAmountValid && pointAmount !== 0 && { pointAmount: pointAmount })
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