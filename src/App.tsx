import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './contexts/ContentContext';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminFolderContent from './pages/AdminFolderContent';
import FolderView from './pages/FolderView';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/folder/:folderId" element={<FolderView />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/folder/:folderId" 
              element={
                <ProtectedRoute>
                  <AdminFolderContent />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
