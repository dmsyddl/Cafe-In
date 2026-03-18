import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import KeywordTags from './components/KeywordTags'
import CafeList from './components/CafeList'
import './App.css'

const API_URL = 'http://localhost:3050'

function App() {
  const [cafes, setCafes] = useState([])
  const [keywords, setKeywords] = useState([])
  const [selectedKeyword, setSelectedKeyword] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/keywords`).then((res) => res.json()),
      fetch(`${API_URL}/cafes`).then((res) => res.json()),
    ])
      .then(([keywordsData, cafesData]) => {
        setKeywords(keywordsData)
        setCafes(cafesData)
        setLoading(false)
      })
      .catch((err) => {
        console.error('데이터 조회 실패:', err)
        setLoading(false)
      })
  }, [])

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword)

    if (keyword === null) {
      fetch(`${API_URL}/cafes`)
        .then((res) => res.json())
        .then((data) => setCafes(data))
        .catch((err) => console.error('전체 카페 조회 실패:', err))
    } else {
      fetch(`${API_URL}/keywords/${keyword.id}/cafes`)
        .then((res) => res.json())
        .then((data) => setCafes(data))
        .catch((err) => console.error('키워드 카페 조회 실패:', err))
    }
  }

  const handleSearchComplete = ({ keyword, cafes, isNew }) => {
    if (isNew) {
      setKeywords((prev) => [...prev, keyword])
    }
    setSelectedKeyword(keyword)
    setCafes(cafes)
  }

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  return (
    <div className="container">
      <h1>Cafe-In</h1>
      <SearchBar keywords={keywords} onSearchComplete={handleSearchComplete} />
      <KeywordTags
        keywords={keywords}
        selectedKeyword={selectedKeyword}
        onSelect={handleKeywordSelect}
      />
      <CafeList cafes={cafes} selectedKeyword={selectedKeyword} />
    </div>
  )
}

export default App
