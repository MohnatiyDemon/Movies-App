import { Card, Col, Flex, Rate, Row, Typography } from 'antd'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import noImage from '../../public/no-image.png'
import './MovieCard.css'

const { Title, Text, Paragraph } = Typography

const genreMapping = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

const MovieCard = ({ movieData }) => {
  const { title, overview, release_date, vote_average, poster_path, genre_ids } = movieData

  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : noImage

  const genresData = genre_ids?.map((genre) => (
    <Text code key={genre}>
      {genreMapping[genre]}
    </Text>
  ))

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
              <h2 className="vote-average">{vote_average ? vote_average.toFixed(1) : null}</h2>
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
