import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto){
    // @IsString() // class 유형 검사
    // readonly title?: string; // 일부 요소만 수정 가능
    // @IsNumber()
    // readonly year?: number;
    // @IsString({each : true})
    // readonly genres?: string[];
}