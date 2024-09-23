import { Alert, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import fetchMovies from '../../api/fetchMovies'
import MovieGrid from '../MovieGrid/MovieGrid'
import './MovieList.css'

const MovieList = ({ query, currentPage, onTotalPagesChange, guestSessionId }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchMovies(query, currentPage)
        setData(data.results)
        if (onTotalPagesChange) {
          onTotalPagesChange(data.total_pages)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [query, currentPage, onTotalPagesChange])

  if (error) {
    return (
      <Row justify="center" style={{ marginTop: '20px', margin: '0 auto', textAlign: 'center' }}>
        <Col span={24}>
          <Alert message="Ошибка при загрузке данных" description={error} type="error" />
        </Col>
      </Row>
    )
  }

  return <MovieGrid movies={data} loading={loading} guestSessionId={guestSessionId} />
}

export default MovieList
