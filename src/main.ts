import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter,  } from '@angular/router';
import { MovieListComponent } from './app/pages/movie-list/movie-list.component';
import { MovieDetailComponent } from './app/pages/movie-detail/movie-detail.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(
      [
        { path: '', component: MovieListComponent },
        { path: 'movie/:slug', component: MovieDetailComponent }
      ])
  ]
});
