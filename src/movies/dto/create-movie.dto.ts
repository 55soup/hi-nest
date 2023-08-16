import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateMovieDto{
    @IsString() // class 유형 검사
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsOptional() // 장르는 데이터 삽입 시 선택사항
    @IsString({each : true})
    readonly genres: string[];
}