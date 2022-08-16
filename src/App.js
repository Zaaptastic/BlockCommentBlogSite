import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ArticleArchive from './components/ArticleArchive'
import ArticleContent from './components/ArticleContent'
import ErrorContent from './components/ErrorContent'
import Header from './components/DevoBanner'

function App() {
  return (
    <div className="App">
      <Header />
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
