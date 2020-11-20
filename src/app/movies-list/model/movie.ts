import { Genres } from './genres';
export interface Movie {
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    runtime: number;
    tagline: string;
    genres: Array<Genres>;
    backdrop_path: string;
}






