interface IMovieData {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

export interface IMoviesData {
    page: number;
    results: IMovieData[]
    total_pages: number;
    total_results: number;
}