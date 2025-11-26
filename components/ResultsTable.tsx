"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Person } from "@/types";

interface ResultsTableProps {
  people: Person[];
  hasSearched: boolean;
  isLoading: boolean;
  creditsUsed?: number;
  totalCredits?: number;
}

export default function ResultsTable({
  people,
  hasSearched,
  isLoading,
  creditsUsed = 8000,
  totalCredits = 50000,
}: ResultsTableProps) {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedPeople((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPeople.length === people.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(people.map((p) => p.id));
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="results-area">
        <div className="loading-state">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="results-area">
        <div className="results-header-empty">
          <div className="results-count-empty">
            Found <strong>0</strong> companies. Click preview to view results
          </div>
          <div className="results-credits-upgrade">
            <div className="results-credits">
              <svg className="credits-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="credits-value">
                Q <span className="current">{creditsUsed.toLocaleString()}</span>/{totalCredits.toLocaleString()}
              </span>
            </div>
            <div className="results-upgrade">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Unlock 100,000 leads with Enterprise Plan*</span>
            </div>
          </div>
        </div>
        <div className="results-table-placeholder">
          <table className="results-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>TITLE</th>
                <th>HEADLINE</th>
                <th>LINKEDIN URL</th>
                <th>COMPANY</th>
                <th>COMPANY URL</th>
                <th>COMPAN</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty table body */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="results-area">
        <div className="results-header">
          <div className="results-count">
            Found <strong>0</strong> companies. Click preview to view results
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-illustration">
            <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="70" r="50" fill="#FEF2F2" />
              <circle cx="100" cy="70" r="35" fill="#FEE2E2" />
              <path d="M85 55L115 85M115 55L85 85" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
              <rect x="60" y="130" width="80" height="8" rx="4" fill="#E5E7EB" />
              <rect x="75" y="145" width="50" height="6" rx="3" fill="#E5E7EB" />
            </svg>
          </div>
          <h3 className="empty-title">No results found</h3>
          <p className="empty-description">
            Try adjusting your filters or search criteria to find more people.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-area">
      <div className="results-header">
        <div className="results-count">
          Found <strong>{people.length}</strong> {people.length === 1 ? "company" : "companies"}
          {selectedPeople.length > 0 && (
            <span> • <strong>{selectedPeople.length}</strong> selected</span>
          )}
        </div>
        <div className="results-actions">
          {selectedPeople.length > 0 && (
            <motion.button
              className="btn btn-secondary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export ({selectedPeople.length})
            </motion.button>
          )}
        </div>
      </div>

      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th className="cell-checkbox">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedPeople.length === people.length && people.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Title</th>
              <th>Headline</th>
              <th>LinkedIn URL</th>
              <th>Company</th>
              <th>Company URL</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <motion.tr
                key={person.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="cell-checkbox">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedPeople.includes(person.id)}
                    onChange={() => toggleSelect(person.id)}
                  />
                </td>
                <td>
                  <div className="cell-name">
                    <div className="avatar">{getInitials(person.name)}</div>
                    <div className="name-info">
                      <span className="name-text">{person.name}</span>
                      <span className="location-text">{person.location}</span>
                    </div>
                  </div>
                </td>
                <td className="cell-title">{person.title}</td>
                <td className="cell-headline" title={person.headline}>
                  {person.headline}
                </td>
                <td>
                  <a
                    href={`https://${person.linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell-link"
                  >
                    {person.linkedinUrl}
                  </a>
                </td>
                <td>
                  <div className="cell-company">
                    <span className="company-name">{person.company}</span>
                    <span className="company-location">{person.companyLocation}</span>
                  </div>
                </td>
                <td>
                  <a
                    href={`https://${person.companyUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell-link"
                  >
                    {person.companyUrl}
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
