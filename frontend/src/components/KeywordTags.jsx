import './KeywordTags.css'

function KeywordTags({ keywords, selectedKeyword, onSelect }) {
  return (
    <div className="keyword-tags">
      <button
        className={`keyword-tag ${selectedKeyword === null ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        전체보기
      </button>
      {keywords.map((keyword) => (
        <button
          key={keyword.id}
          className={`keyword-tag ${selectedKeyword?.id === keyword.id ? 'active' : ''}`}
          onClick={() => onSelect(keyword)}
        >
          {keyword.name}
        </button>
      ))}
    </div>
  )
}

export default KeywordTags
