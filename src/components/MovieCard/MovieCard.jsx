import { Card, Col, Flex, Rate, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useContext, useState } from 'react'
import noImage from '../../public/no-image.png'
import GenresContext from '../GenresContext/GenresContext'
import './MovieCard.css'

const { Text, Paragraph } = Typography

const getRatingClass = (rating) => {
  if (rating <= 3) return 'rating-low'
  if (rating <= 5) return 'rating-medium'
  if (rating <= 7) return 'rating-high'
  return 'rating-excellent'
}

const MovieCard = ({ movieData, guestSessionId }) => {
  const { title, overview, release_date, vote_average, poster_path, genre_ids } = movieData

  const [userRating, setUserRating] = useState(movieData.userRating || 0)

  const handleRateChange = async (value) => {
    setUserRating(value)

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTliMzM3NTI5NWY1YmEzNWVhZTkwMTVlYTBmMjBjOSIsIm5iZiI6MTcyNTAxMTI2OC43MTAyMTUsInN1YiI6IjY2ZDE5MTNlM2UxYWI0NWNlNWIxNTI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HV6mYV4emMyFSy3cdMo_ZH58oQQ2Q4__C3EWZ7nvYg',
      },
      body: JSON.stringify({
        value: value,
      }),
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/rating?guest_session_id=${guestSessionId}`,
        options
      )
      const data = await response.json()

      if (data.success) {
        console.log('Рейтинг успешно установлен!')
      } else {
        console.error('Не удалось установить рейтинг')
        setUserRating(0)
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке рейтинга')
      setUserRating(0)
    }
  }

  const genres = useContext(GenresContext)

  const ratingClass = getRatingClass(vote_average)

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : noImage

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
    <Card styles={{ body: { padding: 0 } }} hoverable className="MovieCard">
      <Row gutter={20}>
        <Col span={10}>
          <img src={imageUrl} alt={title} />
        </Col>
        <Col span={14}>
          <Flex vertical justify="flex-start" gap="4px">
            <Flex justify="space-between" align="center">
              <h1 className="MovieCard__title">{title}</h1>
              <h2 className={`vote-average ${ratingClass}`}>{vote_average ? vote_average.toFixed(1) : null}</h2>
            </Flex>
            <Text type="secondary">{releaseDate}</Text>
            <Flex className="MovieCard__geners" wrap>
              {genresData}
            </Flex>
            <Paragraph strong ellipsis={{ rows: 4 }}>
              {overview}
            </Paragraph>
            <Rate allowHalf value={userRating} onChange={handleRateChange} className="Rate" count={10} />
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default MovieCard
