"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isGTMExpanded, setIsGTMExpanded] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
            <text x="0" y="20" fontSize="18" fontWeight="700" fill="var(--gray-900)">Bitscale</text>
          </svg>
        </div>

        <div className="sidebar-section">
          <div 
            className="sidebar-gtm-header"
            onClick={() => setIsGTMExpanded(!isGTMExpanded)}
          >
            <div className="sidebar-gtm-avatar">
              <div className="avatar-circle">GT</div>
            </div>
            <span className="sidebar-gtm-text">GTM Spaces</span>
            <svg 
              className={`sidebar-chevron ${isGTMExpanded ? 'expanded' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item">
            Home
          </a>
          <a href="#" className="sidebar-nav-item active">
            My Dashboard
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>Playbooks</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </a>
          <a href="#" className="sidebar-nav-item">
            Integrations
          </a>
        </nav>

        <div className="sidebar-divider">
          <span className="sidebar-divider-text">Other</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item">
            Documentation
          </a>
          <a href="#" className="sidebar-nav-item">
            Settings
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <div className="sidebar-footer-logo">Bitscale</div>
            <div className="sidebar-footer-text">Get Support at Bitscale</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

