import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

class SaveRequirement {
    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 0
    }, {
        message: "O id deve ser um número inteiro."
    })
    @IsNotEmpty({
        message: "O id é obrigatório."
    })
    id: number;

    @IsNumber({
        allowNaN: true,
        allowInfinity: false,
        maxDecimalPlaces: 0
    }, {
        message: "O ponto deve ser um número inteiro."
    })
    @IsNotEmpty({
        message: "O ponto é obrigatório."
    })
    point: number;
}

export class SaveRequirementsDto {
    @Type(() => SaveRequirement)
    @IsArray({
        message: "Os requisitos devem ser um array."
    })
    @IsNotEmpty({
        message: "Os requisitos são obrigatórios."
    })
    requirements: SaveRequirement[];
}