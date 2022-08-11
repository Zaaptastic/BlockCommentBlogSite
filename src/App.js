import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ArticleArchive from './components/ArticleArchive'
import ArticleContent from './components/ArticleContent'
import DevoBanner from './components/DevoBanner'
import ErrorContent from './components/ErrorContent'

function App() {
  return (
    <div className="App">
      <DevoBanner />
      <h1>Welcome to Block Comment</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticleArchive />} />
          <Route path="article" >
            <Route path=":articleId/*" element={<ArticleContent />} />
          </Route>
          <Route path="*" element={<ErrorContent />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
