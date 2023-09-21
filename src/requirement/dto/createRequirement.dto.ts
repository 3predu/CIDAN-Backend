import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRequirementDto {
    @IsString({
        message: "O nome do requisito deve ser uma string."
    })
    @IsNotEmpty({
        message: "O nome do requisito não pode estar vazio."
    })
    readonly name: string;

    @IsString({
        message: "A descrição do requisito deve ser uma string."
    })
    readonly description: string;

    @IsNumber({
        allowNaN: false,
        allowInfinity: false
    }, {
        message: "A quantidade de pontos deve ser um número."
    })
    readonly pointAmount: number;
}