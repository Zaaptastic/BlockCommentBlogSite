import './styles/App.css';

import ArticleArchive from './components/ArticleArchive'
import ArticleContent from './components/ArticleContent'
import ErrorContent from './components/ErrorContent'
import Header from './components/Header'
import Footer from './components/Footer'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserView } from 'react-device-detect';

function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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

      <BrowserView>
        <Footer />
      </BrowserView>
    </div>
  );
}

export default App;
