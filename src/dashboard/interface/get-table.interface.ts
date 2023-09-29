export interface Requirement {
    name: string;
    point: number;
}

export interface TableData {
    unityName: string;
    requirementName: string;
    unityPoint: bigint;
}

export interface TableDataResponse {
    unityName: string;
    requirements: Requirement[];
    total: number;
}

export interface GetTableResponse {
    message: string;
    severityWarning: string;
    table: TableDataResponse[];
}