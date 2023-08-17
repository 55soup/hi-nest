import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    // database 처리
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:string): Movie{
        return this.movies.find(movie => movie.id === parseInt(id));
    }

    deleteOne(id:string):boolean {
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    create(movieData:any){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }
}
