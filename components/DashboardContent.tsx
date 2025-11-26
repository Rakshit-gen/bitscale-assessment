"use client";

import { useState } from "react";

interface DashboardContentProps {
  onFindCompanies?: () => void;
  onFindPeople?: () => void;
  onNewGrid?: () => void;
}

interface Grid {
  id: string;
  name: string;
  icon: string;
  editedBy: string;
  lastEdited: string;
  starred: boolean;
}

const mockGrids: Grid[] = [
  {
    id: "1",
    name: "Workbook - Testing design Ideas for grid and workbook",
    icon: "workbook",
    editedBy: "Sam Taylor",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "2",
    name: "LinkedIn",
    icon: "linkedin",
    editedBy: "Chris Parker",
    lastEdited: "06 Aug, 2025",
    starred: true,
  },
  {
    id: "3",
    name: "Sales nav",
    icon: "sales",
    editedBy: "Jone Doe",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "4",
    name: "find company",
    icon: "company",
    editedBy: "Alex Morgan",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "5",
    name: "import csv",
    icon: "csv",
    editedBy: "Drew Wilson",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "6",
    name: "Find people",
    icon: "people",
    editedBy: "Jone Doe",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "7",
    name: "Google maps",
    icon: "maps",
    editedBy: "Jone Doe",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "8",
    name: "google search results",
    icon: "google",
    editedBy: "Jone Doe",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "9",
    name: "factors",
    icon: "factors",
    editedBy: "Jone Doe",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "10",
    name: "Hubspot List - 10 (05 Aug 25)",
    icon: "hubspot",
    editedBy: "Jone Doe",
    lastEdited: "06 Aug, 2025",
    starred: false,
  },
];

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "linkedin":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case "hubspot":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.1 12.6v-1.8c0-.1 0-.2-.1-.2l-1.7-1c-.1-.1-.2 0-.3.1l-1 1.7c0 .1 0 .2.1.2l1.2.7c.1.1.1.1.1.2l-1.2.7c-.1.1-.1.1-.1.2l1 1.7c.1.1.2.1.3.1l1.7-1c.1-.1.1-.1.1-.2v-1.8c0-.1 0-.1-.1-.1h-.1zm-2.1-2.5l-1.2-.7c-.1-.1-.2-.1-.3 0l-1.7 1c-.1.1-.1.1-.1.2v1.8c0 .1 0 .1.1.1h.1v1.8c0 .1 0 .2.1.2l1.7 1c.1.1.2.1.3.1l1-1.7c0-.1 0-.2-.1-.2l-1.2-.7c-.1-.1-.1-.1-.1-.2l1.2-.7c.1-.1.1-.1.1-.2l-1-1.7c-.1-.1-.2-.1-.3-.1zM12.6 6.9c0-.1 0-.2-.1-.2l-1.7-1c-.1-.1-.2 0-.3.1l-1 1.7c0 .1 0 .2.1.2l1.2.7c.1.1.1.1.1.2l-1.2.7c-.1.1-.1.1-.1.2l1 1.7c.1.1.2.1.3.1l1.7-1c.1-.1.1-.1.1-.2V6.9zm-2.1-2.5L9.3 3.7c-.1-.1-.2-.1-.3 0L7.3 4.7c-.1.1-.1.1-.1.2v1.8c0 .1 0 .1.1.1h.1v1.8c0 .1 0 .2.1.2l1.7 1c.1.1.2.1.3.1l1-1.7c0-.1 0-.2-.1-.2l-1.2-.7c-.1-.1-.1-.1-.1-.2l1.2-.7c.1-.1.1-.1.1-.2l-1-1.7c-.1-.1-.2-.1-.3-.1z"/>
        </svg>
      );
    case "people":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "company":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "maps":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "google":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      );
    case "factors":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      );
    case "csv":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "sales":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "workbook":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
  }
};

export default function DashboardContent({
  onFindCompanies,
  onFindPeople,
  onNewGrid,
}: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState<"my-grids" | "starred">("my-grids");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGrids = mockGrids.filter((grid) =>
    grid.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-content">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="dashboard-welcome">
          <h1 className="welcome-title">Welcome back, Tim!</h1>
          <p className="welcome-subtitle">Here's your daily scoop on Bitscale!</p>
        </div>
        <div className="dashboard-actions">
          <button className="header-action-btn" onClick={onFindCompanies}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21h18" />
              <path d="M5 21V7l8-4v18" />
              <path d="M19 21V11l-6-4" />
              <path d="M9 9v0" />
              <path d="M9 12v0" />
              <path d="M9 15v0" />
              <path d="M9 18v0" />
            </svg>
            Find Companies
          </button>
          <button className="header-action-btn" onClick={onFindPeople}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Find People
          </button>
          <button className="header-action-btn primary" onClick={onNewGrid}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Grid
          </button>
        </div>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card latest-card">
          <div className="card-header">
            <h3 className="card-title">Latest from Bitscale</h3>
            <div className="card-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="latest-card-body">
            <div className="video-thumbnail">
              <div className="play-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="card-content">
              <h4 className="video-title">How to Integrate 2 Way HubSpot.</h4>
              <p className="video-description">
                Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple aad our API key through the integrations pa... Posted today.
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-card demo-card">
          <div className="demo-card-header">
            <div className="demo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className="card-title">Complete product demo</h3>
          </div>
          <div className="card-content">
            <p className="demo-stats">92% of users nailed BitScale after this walkthrough.</p>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
              <span className="progress-text">75%</span>
            </div>
            <div className="demo-checklist">
              <div className="checklist-item checked">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Create your data list</span>
              </div>
              <div className="checklist-item checked">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Learn about BitAgent</span>
              </div>
              <div className="checklist-item checked">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Connect an integration</span>
              </div>
              <div className="checklist-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span>Customise waterfall providers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grids-section">
        <div className="grids-header">
          <div className="grids-tabs">
            <button
              className={`tab-button ${activeTab === "my-grids" ? "active" : ""}`}
              onClick={() => setActiveTab("my-grids")}
            >
              My Grids
            </button>
            <button
              className={`tab-button ${activeTab === "starred" ? "active" : ""}`}
              onClick={() => setActiveTab("starred")}
            >
              Starred
            </button>
          </div>
          <div className="grids-search">
            <input
              type="text"
              placeholder="Search grids and workbooks..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div className="grids-table-container">
          <table className="grids-table">
            <thead>
              <tr>
                <th>
                  <div className="table-header-content">
                    <span>Name</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </div>
                </th>
                <th>Edited by</th>
                <th>Last edited</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrids.map((grid) => (
                <tr key={grid.id} className="grid-row">
                  <td>
                    <div className="grid-name-cell">
                      <input type="checkbox" className="row-checkbox" />
                      <button className="expand-icon" title="Expand details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <button 
                        className={`star-icon ${grid.starred ? "starred" : ""}`}
                        title={grid.starred ? "Unstar" : "Star this grid"}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={grid.starred ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                      <div className="grid-icon">{getIcon(grid.icon)}</div>
                      <span className="grid-name">{grid.name}</span>
                    </div>
                  </td>
                  <td>{grid.editedBy}</td>
                  <td>{grid.lastEdited}</td>
                  <td>
                    <button className="actions-button" title="More options">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

