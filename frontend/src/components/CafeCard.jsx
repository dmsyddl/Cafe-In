import './CafeCard.css'

function CafeCard({ cafe }) {
  return (
    <div className="cafe-card">
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
  )
}

export default CafeCard
