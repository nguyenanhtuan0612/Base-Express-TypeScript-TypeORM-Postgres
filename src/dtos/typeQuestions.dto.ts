import { IsString } from 'class-validator';

export class CreateTypeQuestionDto {
    @IsString()
    public code: string;

    @IsString()
    public name: string;
}
