import { IsString } from "class-validator";

export class SignInDto {
    @IsString()
    readonly login : string;

    @IsString()
    readonly password : string;
}