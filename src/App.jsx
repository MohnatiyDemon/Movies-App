import { Input, Layout, Pagination, Radio } from 'antd'
import debounce from 'lodash/debounce'
import { useMemo, useState } from 'react'
import './App.css'
import MovieList from './components/MovieList/MovieList'

const { Group, Button } = Radio

const App = () => {
  const [group, setGroup] = useState('Search')
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('dune')
  const [totalPages, setTotalPages] = useState(0)

  const handleGroupChange = (e) => {
    setGroup(e.target.value)
  }

  const handlePaginationChange = (page) => {
    setCurrentPage(page)
  }

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value) => {
        setQuery(value)
      }, 500),
    []
  )

  const handleInputChange = (e) => {
    debouncedSetQuery(e.target.value)
  }

  const handleTotalPagesChange = (pages) => {
    setTotalPages(pages)
  }

  return (
    <Layout className="container">
      <Group value={group} className="Group" onChange={handleGroupChange}>
        <Button value="Search">Search</Button>
        <Button value="Rated">Rated</Button>
      </Group>
      <Input className="Input" placeholder="Type to search..." onChange={handleInputChange} />

      <MovieList query={query} currentPage={currentPage} onTotalPagesChange={handleTotalPagesChange} />

      <Pagination
        className="Pagination"
        align="center"
        defaultCurrent={1}
        total={totalPages * 10}
        current={currentPage}
        onChange={handlePaginationChange}
        showSizeChanger={false}
      />
    </Layout>
  )
}

export default App
