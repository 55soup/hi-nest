import { Controller, Get, Param, Post, Delete, Patch, Body, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll(){
        return 'This will return all movies';
    }

    @Get("search") // ("/:id") 밑에 있어야함.
    search(@Query("year") searchingYear : string){ // @Query : query string을 가져옴.
        return `We are searching for a movie with a title : ${searchingYear}`
    }

    @Get("/:id")
    getOne(@Param("id") movieId: string){
        // @Param: url parameter 가져오기
        return `This wil return one movie with the id : ${movieId}`;
    }

    @Post()
    create(@Body() movieData){// @Body(): body 데이터 가져오기
        return movieData;
    }

    @Delete("/:id")
    remove(@Param("id") movieId: string){
        return `This will delete a movie with the id : ${movieId}}`;
    }
    
    @Patch("/:id")
    path(@Param('id') movieId: string, @Body() updateData){
        return {
            updateMovie: movieId, // update한 movie id
            ...updateData, // udpate한 data
        }
    }

}
