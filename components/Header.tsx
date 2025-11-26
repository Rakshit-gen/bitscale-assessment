"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  creditsUsed: number;
  totalCredits: number;
  savedSearches: string[];
  showSavedSearches: boolean;
  setShowSavedSearches: (show: boolean) => void;
  onClose?: () => void;
}

export default function Header({
  creditsUsed,
  totalCredits,
  savedSearches,
  showSavedSearches,
  setShowSavedSearches,
  onClose,
}: HeaderProps) {
  return (
    <div className="modal-header">
      <div className="header-left">
        <h1 className="header-title">Find People</h1>
        
        <div className="saved-search-dropdown">
          <button
            className={`saved-search-btn ${showSavedSearches ? "active" : ""}`}
            onClick={() => setShowSavedSearches(!showSavedSearches)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Saved Search
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          
          <AnimatePresence>
            {showSavedSearches && (
              <motion.div
                className="saved-search-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {savedSearches.length > 0 ? (
                  savedSearches.map((search, index) => (
                    <button key={index} className="saved-search-menu-item">
                      {search}
                    </button>
                  ))
                ) : (
                  <div className="saved-search-empty">
                    No saved searches yet
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="header-right">
        <button className="close-btn" aria-label="Close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
