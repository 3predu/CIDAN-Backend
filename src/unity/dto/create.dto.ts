import { IsNotEmpty, IsString } from "class-validator";

export class CreateDto {
    @IsString({
        message: "O nome deve ser uma string."
    })
    @IsNotEmpty({
        message: "O nome não pode ser vazio."
    })
    readonly name: string;
}