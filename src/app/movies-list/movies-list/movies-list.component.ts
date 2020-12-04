import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {
  @Input()
  movies: Movie[] = [];

  constructor() { }

  getPoster(movie: Movie) {
    return movie.poster_path !== null ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : 'no_image_placeholder.jpg';
  }

}
