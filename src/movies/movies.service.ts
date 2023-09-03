import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    // database 처리
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number): Movie{
        console.log(typeof id); // testing server: string
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID: ${id} not found`);
        }
        return movie;
    }

    deleteOne(id:number) {
        this.getOne(id) // movie.id가 존재하지 않을 경우 throw 처리해줌.
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id); // 기존 id movie를 삭제하고
        this.movies.push({...movie, ...updateData}); // updateDate를 넣은 배열을 새로 생성함
    }
}
