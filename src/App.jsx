import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ThemeProvider from './theme/ThemeProvider';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Integrations from './pages/Integrations';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="/dashboard/overview" element={<Dashboard />} />
            <Route path="/dashboard/inbox" element={<Inbox />} />
            <Route path="/dashboard/integrations" element={<Integrations />} />
            <Route path="/dashboard/orders" element={<Dashboard />} />
            <Route path="/dashboard/ai-agent" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
