import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SeatingPage from './pages/SeatingPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminRoute from './components/AdminRoute';
// import Invitation from "./pages/Invitation";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/*<Route path="/invitation" element={<Invitation />} />*/}
          <Route path="/:slug" element={<SeatingPage />} />
          <Route path="/:slug/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
}