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
import { SortType } from '../movies-list/model/sort-type.model';

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
  sortTypes: { value: string }[] = [];
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
    const category = this.route.snapshot.paramMap.get("category");
    this.getSortTypes();
    this.getMovieCategories();
    this.getMovies(category);
  }

  getSortTypes() {
    this.sortTypes = this.moviesService.sortTypes.map(category => {
      return { value: category }
    });
  }

  getMovieCategories() {
    this.movieCategories = this.moviesService.movieCategories;
  }

  getMovies(category) {
    const moviesData$ = this.moviesService.loadMovies(category)
    this.movies$ = this.loadingService.showLoaderUntilCompleted(moviesData$)
      .pipe(
        tap(movies => this.movies = movies['results']),
        shareReplay()
      );
  }

  changeSortType(sort: MatTabChangeEvent) {
    const sortType = sort.tab.textLabel;
    if (sortType == SortType.POPULAR_DESC || sortType == SortType.POPULAR_ASC) {
      this.sortByPopularityAndVote(sortType, 'popularity');
    } else if (sortType === SortType.VOTE_DESC || sortType == SortType.VOTE_ASC) {
      this.sortByPopularityAndVote(sortType, 'vote_average')
    } else if (sortType == SortType.TITLE_DESC || sortType == SortType.TITLE_ASC) {
      this.sortByTitle(sortType, 'title');
    } else {
      this.sortByReleaseDate(sortType);
    }
  }

  sortByPopularityAndVote(sortType, selected) {
    this.movies.sort((a, b) => {
      if (sortType.includes('fallande')) {
        return a[selected] > b[selected] ? -1 : 0
      } else {
        return b[selected] > a[selected] ? -1 : 0
      }
    });
  }

  sortByTitle(sortType, selected) {
    this.movies.sort((a, b) => {
      if (sortType.includes('Ö-A')) {
        return a[selected] > b[selected] ? -1 : 0
      } else {
        return b[selected] > a[selected] ? -1 : 0
      }
    });
  }

  sortByReleaseDate(sortType) {
    this.movies.sort((a, b) => {
      let convertedDateA = Date.parse(a.release_date)
      let convertedDateB = Date.parse(b.release_date)
      if (sortType.includes('fallande')) {
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
