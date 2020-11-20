import { Movie } from './../model/movie';
import { tap, map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}