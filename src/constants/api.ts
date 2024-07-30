import { env } from "../config/env";

export const MOVIE_API_URL = `http://www.omdbapi.com/?apikey=${env.MOVIE_API_KEY}&`;
