import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PagNotFound from '~/pages/404';
import Autenticar from '~/pages/autenticar';
import HomeDashboard from '~/pages/home-dashboard';
import MainContent from '~/pages/main-content';
import { AppState } from '../redux';

const RoutesConfig: React.FC = () => {
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <MainContent>
          <Routes>
            <Route path='/' element={<HomeDashboard />} />
            <Route path='*' element={<Navigate replace to='/' />} />
          </Routes>
        </MainContent>
      ) : (
        <>
          <Routes>
            <Route path='/:codigoValidador' element={<Autenticar />} />
            <Route path='*' element={<PagNotFound />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default RoutesConfig;
