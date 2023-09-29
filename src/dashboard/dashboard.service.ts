import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChartData, GetChartResponse, GetTableResponse, Requirement, TableData, TableDataResponse } from "./interface";

@Injectable()
export class DashboardService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getChart(): Promise<GetChartResponse> {
        try {
            const chartData: ChartData[] = await this.prismaService.$queryRaw`
                select
                    unity.name as unityName,
                    sum(requirementUnity.point) as unityPoint
                
                from unity
                
                inner join requirementUnity on unity.id = requirementUnity.unityId
                
                group by
                    unity.id;
            `;

            return {
                message: "Gráfico obtido com sucesso.",
                severityWarning: "success",
                chartData
            };
        } catch (error: any) {
            throw error;
        }
    }

    async getTable(): Promise<GetTableResponse> {
        try {
            const tableData: TableData[] = await this.prismaService.$queryRaw`
                select
                    unity.name as unityName,
                    requirement.name as requirementName,
                    ifnull(requirementUnity.point, 0) as unityPoint
                    
                from unity

                cross join requirement
                left join requirementUnity on requirementUnity.unityId = unity.id and requirementUnity.requirementId = requirement.id;
            `;

            const unityNames: string[] = Array.from(new Set<string>(tableData.map((data: TableData) => data.unityName)));

            const table: TableDataResponse[] = unityNames.map((unityName: string) => {
                const unityData: TableData[] = tableData.filter((data: TableData) => data.unityName === unityName);

                const requirements: Requirement[] = unityData.map((data: TableData) => {
                    const { requirementName, unityPoint } = data;

                    return {
                        name: requirementName,
                        point: parseInt(unityPoint.toString())
                    }
                });

                const total: number = requirements.reduce((accumulator: number, requirement: Requirement) => accumulator + requirement.point, 0);

                return {
                    unityName,
                    requirements,
                    total
                }
            });

            return {
                message: "Tabela obtida com sucesso.",
                severityWarning: "success",
                table
            };
        } catch (error: any) {
            throw error;
        }
    }
}