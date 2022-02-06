import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from 'providers/AuthProvider';

import { ErrorPage } from './pages/Error';
import { GalleryPage } from './pages/Gallery';
import { LoginPage } from 'pages/Auth/Login';
import { PortfolioPage } from './pages/Portfolio';
import { ProfilePage } from './pages/Profile';
import { RequireAuth } from 'components/RequireAuth/RequireAuth';
import { SignUpPage } from 'pages/Auth/SignUp';

import 'antd/dist/antd.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route path="" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route
              path="gallery"
              element={
                <RequireAuth>
                  <GalleryPage />
                </RequireAuth>
              }
            />
            <Route
              path="portfolio"
              element={
                <RequireAuth>
                  <PortfolioPage />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
