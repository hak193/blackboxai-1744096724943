import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import LoginForm from './LoginForm';
import Dashboard from '../pages/Dashboard';
import CPNGenerator from '../pages/CPNGenerator';
import MarketAnalysis from '../pages/MarketAnalysis';
import Settings from '../pages/Settings';
import type { RootState } from '../store';

type RequireAuthProps = {
  children: React.ReactElement;
};

const RequireAuth = ({ children }: RequireAuthProps): React.ReactElement => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return React.createElement(Navigate, { to: '/login', replace: true });
  }

  return children;
};

const MainApp = (): React.ReactElement => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const protectedRoutes = [
    React.createElement(Route, {
      key: 'dashboard',
      path: '/dashboard',
      element: React.createElement(RequireAuth, null,
        React.createElement(Dashboard)
      )
    }),
    React.createElement(Route, {
      key: 'cpn-generator',
      path: '/cpn-generator',
      element: React.createElement(RequireAuth, null,
        React.createElement(CPNGenerator)
      )
    }),
    React.createElement(Route, {
      key: 'market-analysis',
      path: '/market-analysis',
      element: React.createElement(RequireAuth, null,
        React.createElement(MarketAnalysis)
      )
    }),
    React.createElement(Route, {
      key: 'settings',
      path: '/settings',
      element: React.createElement(RequireAuth, null,
        React.createElement(Settings)
      )
    })
  ];

  const routes = [
    React.createElement(Route, {
      key: 'login',
      path: '/login',
      element: !isAuthenticated 
        ? React.createElement(LoginForm)
        : React.createElement(Navigate, { to: '/dashboard' })
    }),
    React.createElement(Route, {
      key: 'layout',
      element: React.createElement(Layout)
    }, protectedRoutes),
    React.createElement(Route, {
      key: 'default',
      path: '*',
      element: React.createElement(Navigate, { to: '/dashboard', replace: true })
    })
  ];

  return React.createElement(Router, null,
    React.createElement(Routes, null, routes)
  );
};

export default MainApp;
