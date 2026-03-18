import './CafeCard.css'

function CafeCard({ cafe }) {
  return (
    <div className="cafe-card">
      <h2>{cafe.title}</h2>
      <p className="address">{cafe.address}</p>
      {cafe.keywords && cafe.keywords.length > 0 && (
        <div className="tags">
          {cafe.keywords.slice(0, 3).map((kw) => (
            <span key={kw.id} className="tag">{kw.name}</span>
          ))}
          {cafe.keywords.length > 3 && (
            <span className="tag tag-more">+{cafe.keywords.length - 3}</span>
          )}
        </div>
      )}
      {cafe.link && (
        <div className="card-footer">
          <a href={cafe.link} target="_blank" rel="noreferrer">
            상세보기
          </a>
        </div>
      )}
    </div>
  )
}

export default CafeCard
