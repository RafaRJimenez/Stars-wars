import './App.css';
import HomePage from './components/HomePage';
import HomePage2 from './components/HomePage2';
import DetailPage from './components/DetailPage';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      </header>
    </div>
    <Routes>
      <Route path="/" element={<HomePage2 />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
    </Router>
  );
}

export default App;
