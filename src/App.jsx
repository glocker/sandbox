import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Tabs from 'Pages/Tabs/Tabs';
import Grid from 'Pages/GridPagination/Grid';
import HomePage from 'Pages/HomePage/HomePage';
import NoPage from 'Pages/NoPage/NoPage';
import Layout from 'Pages/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/pagination" element={<Grid />} />
          <Route path="/tabs" element={<Tabs />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
