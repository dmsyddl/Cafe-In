import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3050'

function App() {
  const [cafes, setCafes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/cafes`)
      .then((res) => res.json())
      .then((data) => {
        setCafes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('카페 정보 조회 실패:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  return (
    <div className="container">
      <h1>Cafe-In</h1>
      <p className="subtitle">저장된 카페 {cafes.length}개</p>

      {cafes.length === 0 ? (
        <p className="empty">저장된 카페가 없습니다.</p>
      ) : (
        <div className="cafe-grid">
          {cafes.map((cafe) => (
            <div key={cafe.id} className="cafe-card">
              <h2>{cafe.title}</h2>
              {cafe.description && (
                <p className="description">{cafe.description}</p>
              )}
              <div className="info">
                <p><span>주소</span>{cafe.address}</p>
                {cafe.roadAddress && (
                  <p><span>도로명</span>{cafe.roadAddress}</p>
                )}
              </div>
              {cafe.link && (
                <a href={cafe.link} target="_blank" rel="noreferrer">
                  상세보기
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
