import { Card, Col, Flex, Rate, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useContext, useState } from 'react'
import rateMovie from '../../api/rateMovie'
import noImage from '../../assets/no-image.png'
import getRatingClass from '../../utils/getRatingClass'
import GenresContext from '../GenresContext/GenresContext'
import './MovieCard.css'

const { Text, Paragraph } = Typography

const MovieCard = ({ movieData, guestSessionId }) => {
  const { id, title, overview, release_date, vote_average, poster_path, genre_ids } = movieData

  const [userRating, setUserRating] = useState(movieData.userRating || 0)

  const handleRateChange = async (value) => {
    try {
      const data = await rateMovie(id, guestSessionId, value)

      if (data.success) {
        setUserRating(value)
      }
    } catch (error) {
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
              <span className="MovieCard__title">{title}</span>
              <span className={`vote-average ${ratingClass}`}>{vote_average ? vote_average.toFixed(1) : null}</span>
            </Flex>
            <Text type="secondary">{releaseDate}</Text>
            <Flex className="MovieCard__geners" wrap>
              {genresData}
            </Flex>
            <Paragraph style={{ fontSize: 12 }} strong ellipsis={{ rows: 5 }}>
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
