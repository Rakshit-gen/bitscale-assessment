"use client";

interface DashboardHeaderProps {
  onFindCompanies: () => void;
  onFindPeople: () => void;
  onNewGrid: () => void;
}

export default function DashboardHeader({
  onFindCompanies,
  onFindPeople,
  onNewGrid,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <div className="dashboard-logo">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
            <text x="0" y="20" fontSize="18" fontWeight="700" fill="#111827">Bitscale</text>
          </svg>
        </div>
      </div>

      <div className="dashboard-header-right">
        <div className="dashboard-usage">
          <span className="usage-text">450000/5500000</span>
          <button className="booster-plan-btn">Booster Plan</button>
        </div>
        
        <div className="dashboard-profile">
          <div className="profile-avatar">
            <div className="avatar-circle-small">T</div>
          </div>
        </div>
      </div>
    </header>
  );
}

