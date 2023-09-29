export interface ChartData {
    unityName: string;
    unityPoint: number;
}

export interface GetChartResponse {
    message: string;
    severityWarning: string;
    chartData: ChartData[];
}