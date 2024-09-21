import { Input, Layout, Pagination, Tabs } from 'antd'
import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
import createGuestSession from './api/createGuestSession'
import './App.css'
import MovieList from './components/MovieList/MovieList'
import RatedList from './components/RatedList/RatedList'

const App = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('dune')
  const [totalPages, setTotalPages] = useState(0)
  const [guestSessionId, setGuestSessionId] = useState(null)

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

  useEffect(() => {
    const storedGuestSessionId = localStorage.getItem('guestSessionId')
    if (storedGuestSessionId) {
      setGuestSessionId(storedGuestSessionId)
    } else {
      const fetchSession = async () => {
        const newSessionId = await createGuestSession()
        setGuestSessionId(newSessionId)
      }
      fetchSession()
    }
  }, [])

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <Input className="Input" placeholder="Type to search..." onChange={handleInputChange} />

          <MovieList
            query={query}
            currentPage={currentPage}
            onTotalPagesChange={handleTotalPagesChange}
            guestSessionId={guestSessionId}
          />

          <Pagination
            className="Pagination"
            align="center"
            defaultCurrent={1}
            total={totalPages * 10}
            current={currentPage}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedList guestSessionId={guestSessionId} />,
    },
  ]

  return (
    <Layout className="container">
      <Tabs destroyInactiveTabPane centered items={items} />
    </Layout>
  )
}

export default App
