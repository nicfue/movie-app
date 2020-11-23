import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies/popular',
        pathMatch: 'full'
    },
    {
        path: 'movies/:category',
        loadChildren: () => import('./movies-list/movies.module').then(m => m.MoviesModule)
    },
    {
        path: 'movies/:category/:movieId',
        component: MovieComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }