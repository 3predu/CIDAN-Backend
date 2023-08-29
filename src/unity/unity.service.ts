import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDto } from "./dto";
import { CreateResponse } from "./interface";

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
}