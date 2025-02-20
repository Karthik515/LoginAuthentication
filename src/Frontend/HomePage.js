import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [newsList, setNewsList] = useState([]); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const filePreview = file ? URL.createObjectURL(file) : '';

    // Create the news object to be added to the list
    const newNews = {
      headline,
      description,
      file,
      filePreview, 
      id: Date.now(), // Unique id for submission
    };

    // Add the new news to the list
    setNewsList([...newsList, newNews]);
    setHeadline('');
    setDescription('');
    setFile(null);
    console.log(newNews);
  };

  const handleCloseCard = (id) => {
    // Remove the card by filtering out the news item with the given id
    setNewsList(newsList.filter(news => news.id !== id));
  };

  return (
    <div className="home-page">
      <h1 className="title">News Submission</h1>

      <form className="news-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="headline" className="form-label">News Headline</label>
          <input
            type="text"
            id="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Enter the news headline"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the news description"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="file" className="form-label">Upload Image/Document</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      
      <div className="news-cards-container">
        {newsList.map((news) => (
          <div className="news-card" key={news.id}>
            {news.filePreview && (
              <img src={news.filePreview} alt="uploaded preview" className="news-card-image" />
            )}
            <div className="news-card-content">
              <h2 className="news-card-headline">{news.headline || 'No headline entered'}</h2>
              <p className="news-card-description">{news.description || 'No description provided'}</p>
            </div>
            <button
              className="close-btn"
              onClick={() => handleCloseCard(news.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>                              
    </div>
  );
};

export default HomePage;
