import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileSpreadsheet, CheckSquare, Folder, FileText, TrendingUp } from 'lucide-react';

export default function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="px-6">
          <h1 className="text-2xl font-bold" data-testid="app-title">ABPTS</h1>
          <p className="text-sm text-slate-400 mt-1">Automated Bid & Proposal Tracker</p>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            data-testid="nav-dashboard"
          >
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/tracker" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            data-testid="nav-tracker"
          >
            <FileSpreadsheet className="mr-3" size={20} />
            Bid Tracker
          </NavLink>
          
          <NavLink 
            to="/reports" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            data-testid="nav-reports"
          >
            <FileText className="mr-3" size={20} />
            Reports
          </NavLink>
        </nav>
      </aside>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}