import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetManyRequirementsDto {
    @IsString({
        message: "O nome do requisito deve ser uma string."
    })
    name: string;

    @Type(() => Number)
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        message: "A quantidade de pontos do requisito deve ser um número."
    })
    pointAmount: string;

    @IsString({
        message: "A descrição do requisito deve ser uma string."
    })
    description: string;
}