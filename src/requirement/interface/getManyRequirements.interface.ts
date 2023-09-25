import { Requirement } from "@prisma/client";

export interface GetManyRequirementsResponse {
    message: string;
    severityWarning: string;
    requirements: Requirement[];
}