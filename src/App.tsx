import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { AuthProvider } from 'providers/AuthProvider';

// import { AdminPage } from 'pages/Admin';
import { ErrorPage } from './pages/Error';
import { GalleryPage } from './pages/Gallery';
// import { LoginPage } from 'pages/Login';
import { PortfolioPage } from './pages/Portfolio';
import { ProfilePage } from './pages/Profile';
// import { RequireAuth } from 'components/RequireAuth/RequireAuth';

// TODO: add custom them provider
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<GalleryPage />} />
          {/* <Route path="login" element={<LoginPage />} /> */}
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* <Route path="admin" element={<AdminPage />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
