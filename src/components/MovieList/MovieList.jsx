import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = () => {
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
        `https://api.themoviedb.org/3/search/movie?query=dune&include_adult=true&language=en-US&page=1`,
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
  }, [])

  return data ? (
    data.map((movieData) => (
      <Col span={[12, 12]} justify="center">
        <Row justify="center" key={movieData.id}>
          <MovieCard movieData={movieData} />
        </Row>
      </Col>
    ))
  ) : (
    <div>Loading...</div>
  )
}

export default MovieList
