import { Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'

const MovieList = ({ query, currentPage }) => {
  const [data, setData] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTliMzM3NTI5NWY1YmEzNWVhZTkwMTVlYTBmMjBjOSIsIm5iZiI6MTcyNTAxMTI2OC43MTAyMTUsInN1YiI6IjY2ZDE5MTNlM2UxYWI0NWNlNWIxNTI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HV6mYV4emMyFSy3cdMo_ZH58oQQ2Q4__C3EWZ7nvYg',
    },
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${currentPage}`,
        options
      )
      const data = await response.json()
      setData(data.results)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query, currentPage])

  return data ? (
    data.map((movieData) => (
      <Col span={[12, 12]} justify="center" key={movieData.id}>
        <Row justify="center">
          <MovieCard movieData={movieData} />
        </Row>
      </Col>
    ))
  ) : (
    <Row gutter={[16, 25]}>
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <Col span={12} key={key}>
          <Card className="loading-card" loading></Card>
        </Col>
      ))}
    </Row>
  )
}

export default MovieList
