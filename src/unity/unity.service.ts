import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDto, GetManyDto } from "./dto";
import { CreateResponse, GetByIdResponse, GetManyResponse, GetRequirementsResponse, SaveRequirementsResponse } from "./interface";
import { Unity, Requirement, RequirementUnity } from "@prisma/client";
import { RequirementResponse } from "./interface";
import { SaveRequirementsDto } from "./dto/save-requirements.dto";

@Injectable()
export class UnityService {
    constructor(
        private readonly prismaService : PrismaService
    ) {}

    async create(createDto : CreateDto) : Promise<CreateResponse> {
        try {
            const { name } = createDto;

            const unity = await this.prismaService.unity.create({
                data: {
                    name
                }
            });

            return {
                message: "Unidade cadastrada com sucesso."
            };
        } catch (error : any) {
            throw error;
        }
    }

    async getMany(getManyDto : GetManyDto) : Promise<GetManyResponse> {
        try {
            const unities : Unity[] = await this.prismaService.unity.findMany({
                where: {
                    ...(getManyDto.name !== "" ? { name: getManyDto.name } : undefined)
                }
            });

            return {
                message: "Unidades encontradas com sucesso.",
                unities
            }
        } catch (error : any) {
            throw error;
        }
    }

    async getById(id: string) : Promise<GetByIdResponse> {
        try {
            const unityId: number = parseInt(id);

            const validUnityId: boolean = !isNaN(unityId);

            if (!validUnityId) {
                throw new InternalServerErrorException("Id inválido.");
            }

            const unity: Unity = await this.prismaService.unity.findFirstOrThrow({
                where: {
                    id: unityId
                }
            });

            return {
                message: "Unidade buscada com sucesso.",
                severityWarning: "success",
                unity
            }
        } catch (error: any) {
            throw error;
        }
    }

    async getRequirements(id: string): Promise<GetRequirementsResponse> {
        try {
            const unityId: number = parseInt(id);

            const validUnityId: boolean = !isNaN(unityId);

            if (!validUnityId) {
                throw new InternalServerErrorException("Id inválido.");
            }

            const unity = await this.prismaService.unity.findFirstOrThrow({
                where: {
                    id: {
                        equals: unityId
                    }
                },
                select: {
                    requirements: {
                        select: {
                            requirement: true,
                            point: true
                        }
                    }
                }
            });

            const requirements: RequirementResponse[] = unity.requirements.map((requirement) => {
                return {
                    id: requirement.requirement.id,
                    name: requirement.requirement.name,
                    description: requirement.requirement.description,
                    maxPoint: requirement.requirement.maxPoint,
                    point: requirement.point,
                    createdAt: requirement.requirement.createdAt,
                    updatedAt: requirement.requirement.updatedAt
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

    async saveRequirements(unityId: string, saveRequirementsDto: SaveRequirementsDto): Promise<SaveRequirementsResponse> {
        try {
            const unityIdNumber: number = parseInt(unityId);

            const validUnityId: boolean = !isNaN(unityIdNumber);

            if (!validUnityId) {
                throw new InternalServerErrorException("Id de unidade inválida.");
            }

            const { requirements } = saveRequirementsDto;

            let notValidRequirement: boolean = false;
            
            for (let i = 0; i < requirements.length; i++) {
                const requirementId: number = requirements[i].id;
                const requirementPoint: number = requirements[i].point;

                const requirement: Requirement = await this.prismaService.requirement.findFirst({
                    where: {
                        id: requirementId
                    }
                });

                if (requirement && !isNaN(requirementPoint) && requirementPoint >= 0 && requirementPoint <= requirement.maxPoint) {
                    const requriementUnity: RequirementUnity = await this.prismaService.requirementUnity.findFirst({
                        where: {
                            AND: [
                                {
                                    requirementId: {
                                        equals: requirementId
                                    }
                                },
                                {
                                    unityId: {
                                        equals: unityIdNumber
                                    }
                                }
                            ]
                        }
                    });

                    if (requriementUnity) {
                        await this.prismaService.requirementUnity.update({
                            where: {
                                id: requriementUnity.id
                            },
                            data: {
                                point: requirementPoint
                            }
                        });
                    } else {
                        await this.prismaService.requirementUnity.create({
                            data: {
                                requirementId: requirementId,
                                unityId: unityIdNumber,
                                point: requirementPoint
                            }
                        });
                    }
                } else {
                    notValidRequirement = true;
                }
            }

            return {
                message: notValidRequirement ? "Requisitos salvos com erros." : "Requisitos salvos com sucesso.",
                severityWarning: notValidRequirement ? "warning" : "success"
            }
        } catch (error: any) {
            throw error;
        }
    }
}