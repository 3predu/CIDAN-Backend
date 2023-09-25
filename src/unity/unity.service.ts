import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDto, GetManyDto } from "./dto";
import { CreateResponse, GetByIdResponse, GetManyResponse } from "./interface";
import { Unity } from "@prisma/client";

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
}