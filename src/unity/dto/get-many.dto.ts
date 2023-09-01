import { IsString } from "class-validator";

export class GetManyDto {
    @IsString({ message: "O nome deve ser uma string." })
    readonly name : string;
}