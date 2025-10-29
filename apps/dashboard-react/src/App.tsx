import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contatos" element={<Dashboard />} />
        <Route path="/vendas" element={<Dashboard />} />
        <Route path="/funil" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;