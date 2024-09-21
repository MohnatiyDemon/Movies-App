import { Alert, Col, Empty, Row } from 'antd'
import { useEffect, useState } from 'react'
import fetchRatedMovies from '../../api/fetchRatedMovie'
import '../MovieCard/MovieCard.css'
import MovieGrid from '../MovieGrid/MovieGrid'

const RatedList = ({ guestSessionId }) => {
  const [ratedMovies, setRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRatedMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchRatedMovies(guestSessionId)
        setRatedMovies(data.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRatedMovies()
  }, [guestSessionId])

  if (ratedMovies.length === 0 && !loading) {
    return (
      <Row style={{ margin: '0 auto' }}>
        <Col span={24}>
          <Empty style={{ margin: '0 auto' }} description="Оцененных фильмов не найдено, попробуйте поставить оценку" />
        </Col>
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

  return <MovieGrid movies={ratedMovies} loading={loading} guestSessionId={guestSessionId} />
}

export default RatedList
