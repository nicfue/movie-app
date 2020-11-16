import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home/home.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
    declarations: [HomeComponent, MoviesListComponent],
    exports: [CommonModule, MoviesRoutingModule]
})
export class MoviesModule {}