import { Card, Col, Flex, Rate, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useContext } from 'react'
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

const MovieCard = ({ movieData }) => {
  const { title, overview, release_date, vote_average, poster_path, genre_ids } = movieData

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
            <Rate className="Rate" count={10} />
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default MovieCard
