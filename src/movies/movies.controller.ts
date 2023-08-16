import { 
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Body,
    Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    // @Get("search") // ("/:id") 밑에 있어야함.
    // search(@Query("year") searchingYear : string){ // @Query : query string을 가져옴.
    //     return `We are searching for a movie with a title : ${searchingYear}`
    // }

    @Get(":id")
    getOne(@Param("id") movieId: number): Movie{
        // @Param: url parameter 가져오기
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData : CreateMovieDto){// @Body(): body 데이터 가져오기
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param("id") movieId: number){
        return this.moviesService.deleteOne(movieId);
    }
    
    @Patch("/:id")
    path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }

}
