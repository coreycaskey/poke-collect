import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { GalleryPage } from './pages/Gallery';
import { PortfolioPage } from './pages/Portfolio';
import { ProfilePage } from './pages/Profile';
import { ErrorPage } from './pages/Error';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<GalleryPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
