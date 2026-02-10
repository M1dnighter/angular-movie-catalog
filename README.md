# Movie Catalog

Angular application for browsing a movie catalog with hover preview and a detailed movie page.

---

## Description

Movie Catalog is a small Angular application that displays a list of movies loaded from an API.  
The user can search movies by title, view a preview on hover, and open a detailed movie page.

The project is built using modern Angular features such as **standalone components**, **signals**, and **computed values**.

---

## Features

- Movie list loaded from API  
- Search by movie title  
- Hover preview for movie cards  
- Movie detail page with full description  
- Rating color based on value (via custom pipe)  
- Skeleton loaders for images  
- Routing by movie slug  
- Responsive layout  
- BEM-based SCSS styling  

---

## Architecture

The application is built using standalone components and a service-based data layer.

### Main components:

- `movie-list` — displays the list of movies  
- `movie-card` — renders a single movie card  
- `movie-preview` — shows movie preview on hover  
- `movie-detail` — displays detailed movie information  
- `search-bar` — handles movie search input  

### Shared utilities:

- `movie.service` — loads and stores movie data  
- `rating-color.pipe` — determines rating color  
- `slug.util.ts` — generates URL-friendly movie slugs  

---

## Technologies

- Angular (standalone components, signals, computed)  
- TypeScript  
- SCSS (BEM methodology)  
- RxJS  
- JSON Server (or any REST API)  
- HTML5 semantic markup  

---

## Local development

1. Install dependencies:

```bash
npm install
