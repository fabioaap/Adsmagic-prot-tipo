import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load das páginas
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));

// Componente de loading
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#64748b'
  }}>
    Carregando...
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contatos" element={<Dashboard />} />
          <Route path="/vendas" element={<Dashboard />} />
          <Route path="/funil" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;