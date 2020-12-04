import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { Movie } from '../movies-list/model/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie$: Observable<Movie>

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const movieId = +this.route.snapshot.paramMap.get("movieId");
    this.movie$ = this.moviesService.loadMovieById(movieId);
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

}
