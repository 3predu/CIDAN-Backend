import { Controller, Get, Res } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { Response } from "express";
import { GetChartResponse, GetTableResponse } from "./interface";

@Controller("dashboard")
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ) {}

    @Get("chart")
    async getChart(
        @Res() response: Response
    ): Promise<Response> {
        try {
            const getChartResponse: GetChartResponse = await this.dashboardService.getChart();

            return response.status(200).json({
                ...getChartResponse
            });
        } catch (error: any) {
            return response.status(500).json({
                message: "Erro inesperado no servidor ao pegar o gráfico.",
                severityWarning: "error"
            });
        }
    }

    @Get("table")
    async getTable(
        @Res() response: Response
    ): Promise<Response> {
        try {
            const getTableResponse: GetTableResponse = await this.dashboardService.getTable();

            return response.status(200).json({
                ...getTableResponse
            });
        } catch (error: any) {
            console.log(error);

            return response.status(500).json({
                message: "Erro inesperado no servidor ao pegar a tabela.",
                severityWarning: "error"
            });
        }
    }
}