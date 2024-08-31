import { Card } from 'antd'
import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard/MovieCard'

function App() {
  const [data, setData] = useState(null)

  const apiKey = '?api_key=8e9b3375295f5ba35eae9015ea0f20c9'

  const getResponse = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/16${apiKey}`)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getResponse()
  }, [])

  return (
    <>
      {data ? (
        <>
          <MovieCard movieData={data} />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <Card loading="true" />
      )}
    </>
  )
}

export default App
