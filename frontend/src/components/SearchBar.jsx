import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ keywords, onSearchComplete }) {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)

  const API_URL = 'http://localhost:3050'

  const handleSearch = async () => {
    const trimmed = query.trim()
    if (!trimmed) return

    setSearching(true)

    try {
      // 이미 존재하는 키워드인지 확인
      const existing = keywords.find((k) => k.name === trimmed)

      if (existing) {
        // 이미 존재하는 키워드 → 바로 해당 카페 조회
        const cafesRes = await fetch(`${API_URL}/keywords/${existing.id}/cafes`)
        const cafes = await cafesRes.json()
        onSearchComplete({ keyword: existing, cafes, isNew: false })
      } else {
        // 새 키워드 등록 → 검색 실행 → 카페 조회
        const createRes = await fetch(`${API_URL}/keywords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmed }),
        })
        const newKeyword = await createRes.json()

        await fetch(`${API_URL}/keywords/${newKeyword.id}/search`, {
          method: 'POST',
        })

        const cafesRes = await fetch(`${API_URL}/keywords/${newKeyword.id}/cafes`)
        const cafes = await cafesRes.json()
        onSearchComplete({ keyword: newKeyword, cafes, isNew: true })
      }
    } catch (err) {
      console.error('검색 실패:', err)
    } finally {
      setSearching(false)
      setQuery('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="카페 키워드를 입력하세요 (예: 강남 카페)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={searching}
      />
      <button onClick={handleSearch} disabled={searching || !query.trim()}>
        {searching ? '검색 중...' : '검색'}
      </button>
    </div>
  )
}

export default SearchBar
