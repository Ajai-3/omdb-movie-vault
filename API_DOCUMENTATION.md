# OMDb Movie Vault API Documentation

Welcome to the API documentation for the OMDb Movie Vault. This API handles movie searching and favorites management.

## Base URL
`http://localhost:5001/api/v1`

---

## Authentication
Currently, the API does not require user authentication. However, an OMDb API key is required in the backend `.env` file.

---

## Endpoints

### 1. Search Movies
Retrieves a list of movies matching a search query, enriched with IMDb ratings and favorite status.

*   **URL:** `/movies/search`
*   **Method:** `GET`
*   **Query Parameters:**
    *   `query` (required): The title of the movie to search for.
    *   `page` (optional, default: 1): The page number for pagination.
    *   `limit` (optional, default: 10): The number of results per page.
*   **Success Response (200 OK):**
    ```json
    {
      "status": true,
      "message": "Data fetched successfully.",
      "data": {
        "movies": [
          {
            "title": "Inception",
            "year": "2010",
            "imdbID": "tt1375666",
            "type": "movie",
            "poster": "https://...",
            "imdbRating": "8.8",
            "isFavorite": false
          }
        ],
        "pagination": {
          "totalResults": 100,
          "totalPages": 10,
          "currentPage": 1
        }
      }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: If `query` is missing or invalid.
    *   `404 Not Found`: If no movies are found for the query.

---

### 2. Get Favorites
Retrieves the user's list of favorite movies with full details and pagination.

*   **URL:** `/movies/favorites`
*   **Method:** `GET`
*   **Query Parameters:**
    *   `page` (optional, default: 1): The page number for pagination.
    *   `limit` (optional, default: 10): The number of results per page.
*   **Success Response (200 OK):**
    ```json
    {
      "status": true,
      "message": "Data fetched successfully.",
      "data": {
        "movies": [...],
        "pagination": {
          "totalResults": 5,
          "totalPages": 1,
          "currentPage": 1
        }
      }
    }
    ```

---

### 3. Toggle Favorite
Adds or removes a movie from the user's favorites list.

*   **URL:** `/movies/favorites`
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "id": "tt1375666"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "status": true,
      "message": "Added to favorites.",
      "data": {
        "id": "tt1375666",
        "isFavorite": true
      }
    }
    ```

---

## Error Handling

The API uses standard HTTP status codes and returns a consistent error object:

```json
{
  "status": false,
  "error": "Error message description",
  "statusCode": 400
}
```

### Common Status Codes:
*   `400`: Bad Request (Validation failure)
*   `401`: Unauthorized
*   `404`: Not Found
*   `500`: Internal Server Error
*   `502`: Bad Gateway (OMDb API connection issue)
