import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent  {
  @Input()
  movies: Movie[] = [];

  constructor() { }


}
