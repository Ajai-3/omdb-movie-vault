export const ERROR_MESSAGES = {
  BAD_REQUEST: 'Invalid request parameters.',
  MOVIE_ID_REQUIRED: 'Movie ID is required.',
  NOT_FOUND: 'The requested resource was not found.',
  MISSING_OMDB_API_KEY: 'OMDB API KEY is not defined',
  PROVIDE_SEARCH_QUERY: 'Please provide a search query.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  TOO_MANY_RESULTS: 'Too many results, please refine your search.',
  FAILED_TO_FETCH_MOVIES: 'Failed to fetch movies from the OMDb API.',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
};

export const SUCCESS_MESSAGES = {
  FAVORITES_ADDED: 'Added to favorites.',
  FAVORITES_REMOVED: 'Removed from favorites.',
  FETCHED_SUCCESSFULLY: 'Data fetched successfully.',
  FAVORITES_UPDATED: 'Favorites updated successfully.',
};
