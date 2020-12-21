import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../model/movie.model';
import { StateConfig } from '../model/state-config.modal';
import { State } from '../model/state.model';
import { MoviesService } from '../services/movies.services';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  @Input()
  movies: Movie[] = [];
  errorStateConfig: StateConfig;
  errorStateSub: Subscription;

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.getInitState();
  }

  getInitState() {
    this.errorStateConfig = new StateConfig(State.MOVIES, false)
    this.errorStateSub = this.moviesService.error
      .subscribe(error => {
        if (error) {
          this.errorStateConfig.error = true;
        }
      });
  }

  getPoster(movie: Movie) {
    return movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'no_image_placeholder.jpg';
  }

  ngOnDestroy() {
    this.errorStateSub.unsubscribe();
  }

}
