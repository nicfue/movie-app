import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { HomeComponent } from '../home/home.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { LoadingComponent } from '../loading/loading/loading.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [
        HomeComponent,
        MoviesListComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        MoviesRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatDividerModule,
        MatTabsModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        MatInputModule,
        FormsModule
    ],
    providers: [MoviesService, FormBuilder]
})
export class MoviesModule { }