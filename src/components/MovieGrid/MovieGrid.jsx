import { Card, Col, Empty, Row, Spin } from 'antd'
import MovieCard from '../MovieCard/MovieCard'

const MovieGrid = ({ movies, loading, guestSessionId }) => {
  return (
    <Spin spinning={loading} tip="Загрузка..." size="large">
      {movies && movies.length > 0 ? (
        <Row gutter={[16, 25]}>
          {movies.map((movieData) => (
            <Col span={12} key={movieData.id} xs={24} sm={12}>
              <MovieCard guestSessionId={guestSessionId} movieData={movieData} />
            </Col>
          ))}
        </Row>
      ) : !loading ? (
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

export default MovieGrid
