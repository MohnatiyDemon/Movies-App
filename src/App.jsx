import { Input, Layout, Pagination, Tabs } from 'antd'
import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
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

  const createGuestSession = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTliMzM3NTI5NWY1YmEzNWVhZTkwMTVlYTBmMjBjOSIsIm5iZiI6MTcyNTAxMTI2OC43MTAyMTUsInN1YiI6IjY2ZDE5MTNlM2UxYWI0NWNlNWIxNTI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._HV6mYV4emMyFSy3cdMo_ZH58oQQ2Q4__C3EWZ7nvYg',
      },
    }

    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      const data = await response.json()

      if (data.success) {
        localStorage.setItem('guestSessionId', data.guest_session_id)
        setGuestSessionId(data.guest_session_id)
      } else {
        console.error('Не удалось создать гостевую сессию')
      }
    } catch (error) {
      console.error('Ошибка при создании гостевой сессии')
    }
  }

  useEffect(() => {
    const storedGuestSessionId = localStorage.getItem('guestSessionId')
    if (storedGuestSessionId) {
      setGuestSessionId(storedGuestSessionId)
    } else {
      createGuestSession()
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
      <Tabs centered items={items} />
    </Layout>
  )
}

export default App
