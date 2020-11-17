import { GenreId } from './genreId';

export interface Movie {
    id: number;
    genre_ids: Array<GenreId>;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
}






