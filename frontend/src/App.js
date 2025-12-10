import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BidTracker from './pages/BidTracker';
import OpportunityDetail from './pages/OpportunityDetail';
import ComplianceChecker from './pages/ComplianceChecker';
import DocumentManager from './pages/DocumentManager';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/tracker" element={<BidTracker />} />
          <Route path="/opportunity/:id" element={<OpportunityDetail />} />
          <Route path="/compliance/:id" element={<ComplianceChecker />} />
          <Route path="/documents/:id" element={<DocumentManager />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;