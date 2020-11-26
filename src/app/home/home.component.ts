import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/loading/loading.service';
import { Category } from 'src/app/movies-list/model/category';
import { FilterOptions } from 'src/app/movies-list/model/filter-options';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { CategoryViewValue } from '../movies-list/model/category-view-value';
import { Filter } from '../movies-list/model/filter';
import { Movie } from '../movies-list/model/movie';
import { MovieCategories } from '../movies-list/model/movie-categories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  div {
    margin: 30px;
  }
  input {
    background-color: lightsteelblue;
  }
  `]
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]>;
  movies: Movie[];
  selectedCategory: string;
  filterOptions = FilterOptions;
  movieCategories = MovieCategories;
  searchString: string;

  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get("category");
    this.getMovies(category);
    this.convertToViewValue(category);
  }

  getMovies(category) {
    const moviesData$ = this.moviesService.loadMovies(category)
    this.movies$ = this.loadingService.showLoaderUntilCompleted(moviesData$)
      .pipe(
        tap(movies => this.movies = movies['results']),
        shareReplay()
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
        return a[sortingOption] > b[sortingOption] ? -1 : 0
      } else {
        return b[sortingOption] > a[sortingOption] ? -1 : 0
      }
    });
  }

  sortByTitle(selectionOption, sortingOption) {
    this.movies.sort((a, b) => {
      if (selectionOption.includes('Ö-A')) {
        return a[sortingOption] > b[sortingOption] ? -1 : 0
      } else {
        return b[sortingOption] > a[sortingOption] ? -1 : 0
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

  changeCategory(selectedOption: string) {
    this.searchString = '';
    let category;
    if (selectedOption == CategoryViewValue.POPULAR_VIEW_VALUE) {
      category = Category.POPULAR;
    } else if (selectedOption == CategoryViewValue.UPCOMING_VIEW_VALUE) {
      category = Category.UPCOMING;
    } else if (selectedOption == CategoryViewValue.NOW_PLAYING_VIEW_VALUE) {
      category = Category.NOW_PLAYING;
    } else {
      category = Category.TOP_RATED;
    }
    this.selectedCategory = selectedOption;
    this.getMovies(category)
    this.router.navigate(['movies', category]);
  }

  convertToViewValue(category: string) {
    if (category == Category.POPULAR) {
      this.selectedCategory = CategoryViewValue.POPULAR_VIEW_VALUE;
    } else if (category == Category.UPCOMING) {
      this.selectedCategory = CategoryViewValue.UPCOMING_VIEW_VALUE;
    } else if (category == Category.NOW_PLAYING) {
      this.selectedCategory = CategoryViewValue.NOW_PLAYING_VIEW_VALUE;
    } else {
      this.selectedCategory = CategoryViewValue.TOP_RATED_VIEW_VALUE
    }
  }

  onSearch(event: Event) {
    const category = this.route.snapshot.paramMap.get("category");
    let searchString = (<HTMLInputElement>event.target).value;
    if (searchString == '') {
      this.getMovies(category);
    } else {
      this.movies$ = this.moviesService.searchMovie(searchString)
        .pipe(
          delay(500),
          tap(movies => this.movies = movies['results'])
        );
    }
  }

}
