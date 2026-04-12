import axios from 'axios';

export const searchMovies = async (query: string, page: number = 1) => {
  const API_KEY = process.env.OMDB_API_KEY;
  const BASE_URL = process.env.OMDB_BASE_URL;
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      params: {
        apikey: API_KEY,
        s: query.trim(),
        page: page,
      },
    });

    if (response.data.Response === 'False') {
      return {
        Response: 'False',
        Error: response.data.Error,
        Search: [],
        totalResults: "0"
      };
    }

    // Enriching search results with full details (including ratings)
    const movies = response.data.Search || [];
    const detailedMovies = await Promise.all(
        movies.map(async (movie: any) => {
            try {
                const detailRes = await axios.get(`${BASE_URL}/`, {
                    params: {
                        apikey: API_KEY,
                        i: movie.imdbID
                    }
                });
                return {
                    ...movie,
                    imdbRating: detailRes.data.imdbRating || 'N/A'
                };
            } catch (err) {
                return { ...movie, imdbRating: 'N/A' };
            }
        })
    );

    return {
        ...response.data,
        Search: detailedMovies
    };

  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMoviesByIds = async (ids: string[]) => {
  const API_KEY = process.env.OMDB_API_KEY;
  const BASE_URL = process.env.OMDB_BASE_URL;

  try {
    const requests = ids.map((id) =>
      axios.get(`${BASE_URL}/`, {
        params: {
          apikey: API_KEY,
          i: id,
        },
      })
    );
    const responses = await Promise.all(requests);
    return responses.map((res) => ({
      Title: res.data.Title,
      Year: res.data.Year,
      imdbID: res.data.imdbID,
      Type: res.data.Type,
      Poster: res.data.Poster,
      imdbRating: res.data.imdbRating || 'N/A',
      isFavorite: true // We know these are favorites because they came from the IDs list
    }));
  } catch (error) {
    console.error('Error fetching movies by IDs:', error);
    throw error;
  }
};
