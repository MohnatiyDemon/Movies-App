import { API_KEY, API_URL } from './api'

const createGuestSession = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  }

  try {
    const response = await fetch(`${API_URL}/authentication/guest_session/new`, options)
    const data = await response.json()

    if (data.success) {
      localStorage.setItem('guestSessionId', data.guest_session_id)
      return data.guest_session_id
    }
  } catch {
    throw new Error('Ошибка при создании гостевой сессии', response.status)
  }
  return null
}

export default createGuestSession
