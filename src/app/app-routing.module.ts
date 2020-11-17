import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MoviesListComponent } from './movies-list/movies-list/movies-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        loadChildren: () => import('./movies-list/movies.module').then(m => m.MoviesModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}