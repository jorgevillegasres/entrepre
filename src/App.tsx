import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useAppStore } from './contexts/AppStore';
import { LoginPage } from './components/auth/LoginPage';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Inventory } from './components/inventory/Inventory';
import { Sales } from './components/sales/Sales';
import { Customers } from './components/customers/Customers';
import { Finance } from './components/finance/Finance';
import { Reports } from './components/reports/Reports';
import { Settings } from './components/settings/Settings';
import { initializeSampleData } from './data/sampleData';

// Initialize sample data
initializeSampleData();

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { loadData, settings } = useAppStore();
  const [currentView, setCurrentView] = useState('dashboard');

  // Load data and apply dark mode on mount
  useEffect(() => {
    loadData();

    // Apply dark mode class
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update dark mode class when settings change
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'sales':
        return <Sales />;
      case 'customers':
        return <Customers />;
      case 'finance':
        return <Finance />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
