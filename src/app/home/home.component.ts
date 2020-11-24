import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/loading/loading.service';
import { Category } from 'src/app/movies-list/model/category';
import { FilterOptions } from 'src/app/movies-list/model/filter-options';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { CategoryViewValue } from '../movies-list/model/category-view-value';
import { Filter } from '../movies-list/model/filter';
import { Movie } from '../movies-list/model/movie';
import { MovieCategories } from '../movies-list/model/movie-categories';
import { Genre } from './../movies-list/model/genre';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies$: Observable<Movie[]>;
  movies: Movie[];
  selectedCategory: string;
  showEmptyState = false;
  submitted = false;
  filterOptions = FilterOptions;
  movieCategories = MovieCategories;
  genresList$: Observable<Genre[]>;
  genres: Genre[];

  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get("category");
    const moviesData$ = this.moviesService.loadMovies(category);
    this.movies$ = this.loadingService.showLoaderUntilCompleted(moviesData$)
      .pipe(
        tap(res => {
          this.movies = res['results'];
        })
      );
    this.convertToViewValue(category);
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
    const moviesData$ = this.moviesService.loadMovies(category)
    this.movies$ = this.loadingService.showLoaderUntilCompleted(moviesData$)
      .pipe(
        tap(movies => this.movies = movies['results']),
        shareReplay()
      );
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

  searchMovie(searchString: string) {
    this.submitted = true;
    if (searchString === '') {
      this.showEmptyState = true;
      return;
    }
    this.movies$ = this.moviesService.searchMovie(searchString);
    this.submitted = false;
  }

  clearInput(text: string) {
    text['value'] = '';
    this.submitted = false;
  }
}
