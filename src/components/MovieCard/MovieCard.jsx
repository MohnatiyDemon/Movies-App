import { StarOutlined } from '@ant-design/icons'
import { Card, Flex, Typography } from 'antd'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import './MovieCard.css'

const { Title, Text, Paragraph } = Typography
const imgUrl = 'https://image.tmdb.org/t/p/w500/'

const MovieCard = ({ movieData }) => {
  const genresData = movieData?.genres?.map((genre) => {
    return (
      <Text code key={genre.id}>
        {genre.name}
      </Text>
    )
  })
  return (
    <Card hoverable>
      <Flex gap="20px">
        <Flex>
          <img src={imgUrl + movieData.poster_path} alt={movieData.original_title} width="250px" />
        </Flex>
        <Flex vertical>
          <Flex justify="space-between" align="center">
            <Title level={1}>{movieData.original_title}</Title>
            <Title level={3} className="vote-average">
              {movieData.vote_average ? movieData.vote_average.toFixed(1) : null}
            </Title>
          </Flex>
          <Text type="secondary">{format(new Date(movieData.release_date), 'MMMM dd, yyyy', { locale: enGB })}</Text>
          <Flex wrap>{genresData}</Flex>
          <Paragraph strong ellipsis={{ rows: 9 }}>
            {movieData.overview}
          </Paragraph>
          <Flex>
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default MovieCard
