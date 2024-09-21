import { API_KEY, API_URL } from './api'

const fetchRatedMovies = async (guestSessionId) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  }

  const response = await fetch(
    `${API_URL}/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    options
  )
  if (response.ok) {
    return response.json()
  }
}

export default fetchRatedMovies
