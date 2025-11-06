import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('technology')

  const API_KEY = '5f7804e0cf586274d8dcb1cf4687dd96'

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `http://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=en&sort=published_desc&keywords=${query}`
        )
        const data = await response.json()
        if (data.data) {
          setNews(data.data)
        } else {
          setError('No news found')
        }
      } catch (err) {
        setError('Failed to fetch news')
      }
      setLoading(false)
    }

    fetchNews()
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    const keyword = e.target.search.value
    if (keyword) setQuery(keyword)
  }

  return (
    <div className="app-container">
      <h1 className="title">📰 Media News App</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="search"
          placeholder="Search news..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {loading && <p className="message">Loading news...</p>}
      {error && <p className="message error">{error}</p>}

      <div className="news-grid">
        {news.map((article, index) => (
          <div className="news-card" key={index}>
            {article.image && <img src={article.image} alt="news" />}
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description || 'No description available.'}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more →
              </a>
              <p className="source">Source: {article.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
