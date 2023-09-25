import { Unity } from "@prisma/client";

export interface GetByIdResponse {
    message: string;
    severityWarning: string;
    unity: Unity;
}