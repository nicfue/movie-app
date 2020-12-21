import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { Movie } from '../movies-list/model/movie.model';
import { StateConfig } from '../movies-list/model/state-config.modal';
import { State } from '../movies-list/model/state.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie$: Observable<Movie>
  errorStateConfig: StateConfig;
  errorStateSub: Subscription;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const movieId = +this.route.snapshot.paramMap.get("movieId");
    this.getMovie(movieId);
  }

  getMovie(id: number) {
    this.movie$ = this.moviesService.loadMovieById(id);
    this.getErrorState();
  }

  getErrorState() {
    this.errorStateSub = this.moviesService.error
      .subscribe(errorResponse => {
        if (errorResponse) {
          this.errorStateConfig = new StateConfig(State.MOVIE, false)
          this.errorStateConfig.error = true;
        }
      });
  }

  getPoster(movie: Movie) {
    return movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'no_image_placeholder.jpg';
  }

  runtime(time: number) {
    let hours = time / 60,
      getHours = Math.floor(hours),
      getMinutes = Math.round(hours % 1 * 60);
    return `${hours >= 1 ? getHours + ' tim' : ''}  ${getMinutes ? getMinutes + ' min' : ' '}`
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.errorStateSub.unsubscribe();
  }

}
