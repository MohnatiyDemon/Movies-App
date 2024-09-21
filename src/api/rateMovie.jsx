import { API_KEY, API_URL } from './api'

const rateMovie = async (movieId, guestSessionId, ratingValue) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: API_KEY,
    },
    body: JSON.stringify({
      value: ratingValue,
    }),
  }

  const response = await fetch(`${API_URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, options)

  if (response.ok) {
    return response.json()
  }
}

export default rateMovie
