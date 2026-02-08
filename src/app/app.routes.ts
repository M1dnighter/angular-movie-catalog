import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

export const routes: Routes = [
    {path: '', component: MovieListComponent},
    {path: 'movie/:id', component: MovieDetailComponent},
    {path: '**', redirectTo: ''},
];
