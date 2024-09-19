import { Alert, Card, Col, Empty, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Text } = Typography

const RatedList = ({ guestSessionId }) => {
  const [ratedMovies, setRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!guestSessionId) return

    const fetchRatedMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTliMzM3NTI5NWY1YmEzNWVhZTkwMTVlYTBmMjBjOSIsIm5iZiI6MTcyNTAxMTI2OC43MTAyMTUsInN1YiI6IjY2ZDE5MTNlM2UxYWI0NWNlNWIxNTI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HV6mYV4emMyFSy3cdMo_ZH58oQQ2Q4__C3EWZ7nvYg',
        },
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
          options
        )
        const data = await response.json()
        setRatedMovies(data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRatedMovies()
  }, [guestSessionId])

  if (loading) {
    return (
      <Row gutter={[16, 25]}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
          <Col span={12} key={key}>
            <Card className="loading-card" loading />
          </Col>
        ))}
      </Row>
    )
  }

  if (error) {
    return (
      <Row justify="center" style={{ marginTop: '20px', margin: '0 auto', textAlign: 'center' }}>
        <Col span={24}>
          <Alert message="Ошибка при загрузке данных" description={error} type="error" />
        </Col>
      </Row>
    )
  }

  if (ratedMovies.length === 0) {
    return (
      <Row style={{ margin: '0 auto' }}>
        <Col span={24}>
          <Empty style={{ margin: '0 auto' }} description="Пока нет оцененных фильмов" />
        </Col>
      </Row>
    )
  }

  return (
    <Row gutter={[16, 25]}>
      {ratedMovies.map((movie) => (
        <Col span={12} key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Рейтинг: {movie.vote_average}</p>
        </Col>
      ))}
    </Row>
  )
}

export default RatedList
