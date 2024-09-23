import { API_KEY, API_URL } from './api'

const fetchMovies = async (query, currentPage) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  }

  try {
    const response = await fetch(
      `${API_URL}/search/movie?query=${query}&include_adult=true&language=en-US&page=${currentPage}`,
      options
    )

    if (!response.ok) {
      throw new Error(`Ошибка запроса! Статус: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export default fetchMovies
