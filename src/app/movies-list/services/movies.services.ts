import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Category } from '../model/category.model';
import { CategoryViewValue } from '../model/category-view-value.model';
import { Movie } from '../model/movie.model';
import { SortCategory } from '../model/sort-category.model';

let API_KEY = '256af02e76ba7bbeb28d35166f86fc67';
@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }

  movieCategories = [
    { value: Category.POPULAR, viewValue: CategoryViewValue.POPULAR_VIEW_VALUE },
    { value: Category.UPCOMING, viewValue: CategoryViewValue.UPCOMING_VIEW_VALUE },
    { value: Category.NOW_PLAYING, viewValue: CategoryViewValue.NOW_PLAYING_VIEW_VALUE },
    { value: Category.TOP_RATED, viewValue: CategoryViewValue.TOP_RATED_VIEW_VALUE }
  ]

  sortCategories = [
    { value: SortCategory.POPULAR_DESC },
    { value: SortCategory.POPULAR_ASC },
    { value: SortCategory.VOTE_DESC },
    { value: SortCategory.VOTE_ASC },
    { value: SortCategory.RELEASE_DATE_DESC },
    { value: SortCategory.RELEASE_DATE_ASC },
    { value: SortCategory.TITLE_DESC },
    { value: SortCategory.TITLE_ASC }
  ];

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