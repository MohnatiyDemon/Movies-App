import { Alert, Card, Col, Empty, Flex, Rate, Row, Spin, Typography } from 'antd'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useContext, useEffect, useState } from 'react'
import noImage from '../../assets/no-image.png'
import getRatingClass from '../../utils/getRatingClass'
import GenresContext from '../GenresContext/GenresContext'
import '../MovieCard/MovieCard.css'

const { Text, Paragraph } = Typography

const RatedList = ({ guestSessionId }) => {
  const [ratedMovies, setRatedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const genres = useContext(GenresContext)

  useEffect(() => {
    const fetchRatedMovies = async () => {
      setLoading(true)
      setError(null)

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
        if (!response.ok) {
          throw new Error(`Ошибка загрузки данных! Статус: ${response.status}`)
        }

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

  return (
    <Spin spinning={loading} tip="Загрузка..." size="large">
      {ratedMovies && ratedMovies.length > 0 ? (
        <Row gutter={[16, 25]}>
          {ratedMovies.map((movie) => {
            const { id, title, overview, release_date, vote_average, poster_path, genre_ids, rating } = movie

            const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : noImage
            const ratingClass = getRatingClass(vote_average)

            const genresData = genre_ids?.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId)
              return genre ? (
                <Text code key={genre.id}>
                  {genre.name}
                </Text>
              ) : null
            })

            const releaseDate = release_date
              ? format(new Date(release_date), 'MMMM dd, yyyy', { locale: enGB })
              : 'Unknown release date'

            return (
              <Col key={id} span={12} xs={24} sm={12}>
                <Card hoverable className="MovieCard" styles={{ body: { padding: 0 } }}>
                  <Row gutter={20}>
                    <Col span={10}>
                      <img src={imageUrl} alt={title} />
                    </Col>
                    <Col span={14}>
                      <Flex vertical justify="flex-start" gap="4px">
                        <Flex justify="space-between" align="center">
                          <span className="MovieCard__title">{title}</span>
                          <span className={`vote-average ${ratingClass}`}>
                            {vote_average ? vote_average.toFixed(1) : null}
                          </span>
                        </Flex>
                        <Text type="secondary">{releaseDate}</Text>
                        <div className="MovieCard__geners">{genresData}</div>
                        <Paragraph style={{ fontSize: 12 }} strong ellipsis={{ rows: 5 }}>
                          {overview}
                        </Paragraph>
                        <Rate allowHalf disabled value={rating} className="Rate" count={10} />
                      </Flex>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )
          })}
        </Row>
      ) : (
        loading || (
          <Row gutter={[16, 25]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
              <Col span={12} key={key}>
                <Card className="loading-card" loading />
              </Col>
            ))}
          </Row>
        )
      )}
    </Spin>
  )
}

export default RatedList
