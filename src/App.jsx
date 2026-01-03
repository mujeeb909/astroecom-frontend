import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ThemeProvider from './theme/ThemeProvider';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Integrations from './pages/Integrations';
import AIAgentTesting from './pages/AIAgentTesting';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComingSoon from './pages/ComingSoon';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes - Redirect to dashboard if logged in */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
              <Route path="/dashboard/overview" element={<Dashboard />} />
              <Route path="/dashboard/inbox" element={<Inbox />} />
              <Route path="/dashboard/comments" element={<ComingSoon />} />
              <Route path="/dashboard/integrations" element={<Integrations />} />
              <Route path="/dashboard/reports" element={<ComingSoon />} />
              <Route path="/dashboard/campaigns" element={<ComingSoon />} />
              <Route path="/dashboard/customers" element={<ComingSoon />} />
              <Route path="/dashboard/ai-agent" element={<AIAgentTesting />} />
              <Route path="/dashboard/sentiment" element={<ComingSoon />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
