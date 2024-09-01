import { Layout, Row } from 'antd'
import './App.css'
import MovieList from './components/MovieList/MovieList'

const App = () => {
  return (
    <Layout className="container">
      <Row gutter={[25, 25]}>
        <MovieList />
      </Row>
    </Layout>
  )
}

export default App
