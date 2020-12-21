import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MoviesService } from 'src/app/movies-list/services/movies.services';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';
import { LoadingComponent } from '../loading/loading/loading.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';


@NgModule({
    declarations: [
        HomeComponent,
        MoviesListComponent,
        LoadingComponent,
        ErrorComponent
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
    exports: [ErrorComponent],
    providers: [MoviesService, FormBuilder]
})
export class MoviesModule { }