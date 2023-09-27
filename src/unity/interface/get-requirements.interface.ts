export interface RequirementResponse {
    id: number;
    name: string;
    description?: string
    maxPoint: number;
    point: number;
    createdAt: Date;
    updatedAt: Date;
} 

export interface GetRequirementsResponse {
    message: string;
    severityWarning: string;
    requirements: RequirementResponse[];
}