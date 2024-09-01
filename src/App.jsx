import { Input, Layout, Pagination, Radio, Row } from 'antd'
import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList/MovieList'

const { Group, Button } = Radio

const App = () => {
  const [group, setGroup] = useState('Search')
  const handleGroupChange = (e) => {
    setGroup(e.target.value)
  }

  return (
    <Layout className="container">
      <Group value={group} className="Group" onChange={handleGroupChange}>
        <Button value="Search">Search</Button>
        <Button value="Rated">Rated</Button>
      </Group>
      <Input className="Input" placeholder="Type to search..." />
      <Row gutter={[25, 25]}>
        <MovieList />
      </Row>
      <Pagination className="Pagination" align="center" defaultCurrent={1} total={50} />
    </Layout>
  )
}

export default App
