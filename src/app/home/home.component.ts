import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/loading/loading.service';
import { Category } from 'src/app/movies-list/model/category.model';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { CategoryViewValue } from '../movies-list/model/category-view-value.model';
import { Movie } from '../movies-list/model/movie.model';
import { SortCategory } from '../movies-list/model/sort-category.model';

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
  sortCategories: { value: string }[] = [];
  movieCategories: { value: string, viewValue: string }[] = [];
  searchString: string;

  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.sortCategories = this.moviesService.sortCategories;
    this.movieCategories = this.moviesService.movieCategories;
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

  changeSorting(sort: MatTabChangeEvent) {
    const sortCategory = sort.tab.textLabel;
    if (sortCategory == SortCategory.POPULAR_DESC || sortCategory == SortCategory.POPULAR_ASC) {
      this.sortByPopularityAndVote(sortCategory, 'popularity');
    } else if (sortCategory === SortCategory.VOTE_DESC || sortCategory == SortCategory.VOTE_ASC) {
      this.sortByPopularityAndVote(sortCategory, 'vote_average')
    } else if (sortCategory == SortCategory.TITLE_DESC || sortCategory == SortCategory.TITLE_ASC) {
      this.sortByTitle(sortCategory, 'title');
    } else {
      this.sortByReleaseDate(sortCategory);
    }
  }

  sortByPopularityAndVote(sortCategory, selected) {
    this.movies.sort((a, b) => {
      if (sortCategory.includes('fallande')) {
        return a[selected] > b[selected] ? -1 : 0
      } else {
        return b[selected] > a[selected] ? -1 : 0
      }
    });
  }

  sortByTitle(sortCategory, selected) {
    this.movies.sort((a, b) => {
      if (sortCategory.includes('Ö-A')) {
        return a[selected] > b[selected] ? -1 : 0
      } else {
        return b[selected] > a[selected] ? -1 : 0
      }
    });
  }

  sortByReleaseDate(sortCategory) {
    this.movies.sort((a, b) => {
      let convertedDateA = Date.parse(a.release_date)
      let convertedDateB = Date.parse(b.release_date)
      if (sortCategory.includes('fallande')) {
        return convertedDateA > convertedDateB ? -1 : 0;
      } else {
        return convertedDateB > convertedDateA ? -1 : 0;
      }
    });
  }

  changeCategory(selected: string) {
    this.searchString = '';
    let category;
    if (selected == CategoryViewValue.POPULAR_VIEW_VALUE) {
      category = Category.POPULAR;
    } else if (selected == CategoryViewValue.UPCOMING_VIEW_VALUE) {
      category = Category.UPCOMING;
    } else if (selected == CategoryViewValue.NOW_PLAYING_VIEW_VALUE) {
      category = Category.NOW_PLAYING;
    } else {
      category = Category.TOP_RATED;
    }
    this.selectedCategory = selected;
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

  onSearch(searchString: string) {
    const category = this.route.snapshot.paramMap.get("category");
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
