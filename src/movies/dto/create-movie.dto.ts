import { IsString, IsNumber } from "class-validator";

export class CreateMovieDto{
    @IsString() // class 유형 검사
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsString({each : true})
    readonly genres: string[];
}