import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap, catchError } from 'rxjs/operators';
import { Category } from '../model/category.model';
import { CategoryViewValue } from '../model/category-view-value.model';
import { Movie } from '../model/movie.model';
import { SortType } from '../model/sort-type.model';
import { Subject, throwError } from 'rxjs';

let API_KEY = '256af02e76ba7bbeb28d35166f86fc67';
@Injectable()
export class MoviesService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  movieCategories = [
    { value: Category.POPULAR, viewValue: CategoryViewValue.POPULAR_VIEW_VALUE },
    { value: Category.UPCOMING, viewValue: CategoryViewValue.UPCOMING_VIEW_VALUE },
    { value: Category.NOW_PLAYING, viewValue: CategoryViewValue.NOW_PLAYING_VIEW_VALUE },
    { value: Category.TOP_RATED, viewValue: CategoryViewValue.TOP_RATED_VIEW_VALUE }
  ]

  sortTypes = [
    SortType.POPULAR_DESC,
    SortType.POPULAR_ASC,
    SortType.VOTE_DESC,
    SortType.VOTE_ASC,
    SortType.RELEASE_DATE_DESC,
    SortType.RELEASE_DATE_ASC,
    SortType.TITLE_DESC,
    SortType.TITLE_ASC
  ];

  loadMovies(category) {
    return this.http.get<Movie[]>(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`)
      .pipe(
        tap(res => console.log(res['results']),
          map(res => res['results'])
        ),
        catchError(error => {
          return throwError(this.error.next(error));
        })
      );
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