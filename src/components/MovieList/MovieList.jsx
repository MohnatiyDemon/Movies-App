import { Alert, Card, Col, Empty, Row, Spin } from 'antd'
import { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'

const MovieList = ({ query, currentPage, onTotalPagesChange }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTliMzM3NTI5NWY1YmEzNWVhZTkwMTVlYTBmMjBjOSIsIm5iZiI6MTcyNTAxMTI2OC43MTAyMTUsInN1YiI6IjY2ZDE5MTNlM2UxYWI0NWNlNWIxNTI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HV6mYV4emMyFSy3cdMo_ZH58oQQ2Q4__C3EWZ7nvYg',
    },
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${currentPage}`,
        options
      )
      if (!response.ok) {
        throw new Error(`Response error! Status: ${response.status}`)
      }
      const data = await response.json()
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

  useEffect(() => {
    fetchData()
  }, [query, currentPage])

  if (error) {
    return (
      <Row justify="center" style={{ marginTop: '20px', margin: '0 auto', textAlign: 'center' }}>
        <Col span={24}>
          <Alert message="Ошибка при загрузке данных" description={error} type="error" />
        </Col>
      </Row>
    )
  }

  return (
    <Spin spinning={loading} tip="Загрузка..." size="large">
      {data && data.length > 0 ? (
        <Row gutter={[16, 25]}>
          {data.map((movieData) => (
            <Col span={12} key={movieData.id}>
              <MovieCard movieData={movieData} />
            </Col>
          ))}
        </Row>
      ) : !loading || !query ? (
        <Row style={{ margin: '0 auto' }}>
          <Col span={24}>
            <Empty style={{ margin: '0 auto' }} description="Фильмы не найдены" />
          </Col>
        </Row>
      ) : (
        <Row gutter={[16, 25]}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
            <Col span={12} key={key}>
              <Card className="loading-card" loading />
            </Col>
          ))}
        </Row>
      )}
    </Spin>
  )
}

export default MovieList
