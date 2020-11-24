import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Movie } from './../model/movie';

let API_KEY = '256af02e76ba7bbeb28d35166f86fc67';
@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }

  loadMovies(category) {
    return this.http.get<Movie[]>(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`)
      .pipe(
        tap(res => console.log(res['results']),
          map(res => res['results'])
        )
      )
  }

  loadMovieById(movieId: number) {
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .pipe(
        shareReplay()
      );
  }

  searchMovie(searchString: string) {
    if (searchString !== null) {
      const encodedString = encodeURI(searchString);
      return this.http.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedString}&page=1`)
        .pipe(
          shareReplay()
        );
    }
  }
}