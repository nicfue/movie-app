import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/movies-list/model/category';
import { CategoryViewValue } from 'src/app/movies-list/model/category-view-value';
import { FilterOption } from 'src/app/movies-list/model/filter-option';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { Filter } from '../../movies-list/model/filter';
import { CategoryOption } from './../../movies-list/model/category-option';
import { Movie } from './../../movies-list/model/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$: Observable<Movie[]> = this.moviesSubject.asObservable();
  movies: Movie[];

  filterOptions: FilterOption[] = [
    { value: Filter.POPULAR_DESC },
    { value: Filter.POPULAR_ASC },
    { value: Filter.VOTE_DESC },
    { value: Filter.VOTE_ASC },
    { value: Filter.RELEASE_DATE_DESC },
    { value: Filter.RELEASE_DATE_ASC },
    { value: Filter.TITLE_DESC },
    { value: Filter.TITLE_ASC }
  ];

  movieCategories: CategoryOption[] = [
    { value: Category.POPULAR, viewValue: CategoryViewValue.POPULAR_VIEW_VALUE },
    { value: Category.UPCOMING, viewValue: CategoryViewValue.UPCOMING_VIEW_VALUE },
    { value: Category.NOW_PLAYING, viewValue: CategoryViewValue.NOW_PLAYING_VIEW_VALUE },
    { value: Category.TOP_RATED, viewValue: CategoryViewValue.TOP_RATED_VIEW_VALUE },
  ]

  constructor(private moviesService: MoviesService) {

  }

  ngOnInit(): void {
    this.movies$ = this.moviesService.loadMovies(Category.POPULAR).pipe(
      tap(movies => {
        this.movies = movies['results'],
        this.sortByPopularityAndVote(Filter.POPULAR_DESC, 'popularity');
      })
    );
  }

  changeFilterOption(selected: MatTabChangeEvent) {
    const selectedOption = selected.tab.textLabel;
    if (selectedOption == Filter.POPULAR_DESC || selectedOption == Filter.POPULAR_ASC) {
      this.sortByPopularityAndVote(selectedOption, 'popularity');
    } else if (selectedOption === Filter.VOTE_DESC || selectedOption == Filter.VOTE_ASC) {
      this.sortByPopularityAndVote(selectedOption, 'vote_average')
    } else if (selectedOption == Filter.TITLE_DESC || selectedOption == Filter.TITLE_ASC) {
      this.sortByTitle(selectedOption, 'title');
    } else {
      this.sortByReleaseDate(selectedOption);
    }
  }

  sortByPopularityAndVote(selectionOption, sortingOption) {
    this.movies.sort((a, b) => {
      if (selectionOption.includes('fallande')) {
        return (a[sortingOption] > b[sortingOption]) ? -1 : 0
      } else {
        return (b[sortingOption] > a[sortingOption]) ? -1 : 0
      }
    });
  }

  sortByTitle(selectionOption, sortingOption) {
    this.movies.sort((a, b) => {
      if (selectionOption.includes('Ö-A')) {
        return (a[sortingOption] > b[sortingOption]) ? -1 : 0
      } else {
        return (b[sortingOption] > a[sortingOption]) ? -1 : 0
      }
    });
  }

  sortByReleaseDate(selectionOption) {
    this.movies.sort((a, b) => {
      let convertedDateA = Date.parse(a.release_date)
      let convertedDateB = Date.parse(b.release_date)
      if (selectionOption.includes('fallande')) {
        return convertedDateA > convertedDateB ? -1 : 0;
      } else {
        return convertedDateB > convertedDateA ? -1 : 0;
      }
    });
  }

  changeMovieCategory(movieCategory: MatTabChangeEvent) {
    const selectedOption = movieCategory.tab.textLabel;
    this.getMovieCategory(selectedOption);
  }

  getMovieCategory(selectedOption: string) {
    let category = '';
    if (selectedOption == CategoryViewValue.POPULAR_VIEW_VALUE) {
      category = Category.POPULAR;
    } else if (selectedOption == CategoryViewValue.UPCOMING_VIEW_VALUE) {
      category = Category.UPCOMING;
    } else if (selectedOption == CategoryViewValue.NOW_PLAYING_VIEW_VALUE) {
      category = Category.NOW_PLAYING;
    } else {
      category = Category.TOP_RATED;
    }
    this.movies$ = this.moviesService.loadMovies(category)
      .pipe(
        tap(movies => this.movies = movies['results'])
      )
  }
}

