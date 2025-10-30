import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';
import { initSentry } from './sentry';

// Inicializar Sentry no início da aplicação
initSentry();

// Lazy load das páginas
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const RUMDashboard = lazy(() => import('./components/RUMDashboard').then(module => ({ default: module.RUMDashboard })));

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

// Componente principal com performance monitoring
function AppContent() {
  // Ativar monitoring de performance
  usePerformanceMonitoring();

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contatos" element={<Dashboard />} />
          <Route path="/vendas" element={<Dashboard />} />
          <Route path="/funil" element={<Dashboard />} />
          <Route path="/performance" element={<Dashboard />} />
          <Route path="/rum" element={<RUMDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function App() {
  return <AppContent />;
}

export default App;