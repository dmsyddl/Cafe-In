import { IsString, IsNotEmpty } from "class-validator";

export class CreateKeywordDto {
    @IsString({message: 'name은 문자열이어야 합니다.'})
    @IsNotEmpty({message: 'name은 필수값입니다.'})
    name: string;
}