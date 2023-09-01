import { Unity } from "@prisma/client";

export interface GetManyResponse {
    message : string;
    unities : Unity[];
}