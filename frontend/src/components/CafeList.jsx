import CafeCard from './CafeCard'
import './CafeList.css'

function CafeList({ cafes, selectedKeyword }) {
  return (
    <>
      <p className="subtitle">
        {selectedKeyword ? `"${selectedKeyword.name}" 카페` : '전체 카페'} {cafes.length}개
      </p>

      {cafes.length === 0 ? (
        <p className="empty">저장된 카페가 없습니다.</p>
      ) : (
        <div className="cafe-grid">
          {cafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      )}
    </>
  )
}

export default CafeList
