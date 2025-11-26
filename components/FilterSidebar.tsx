"use client";

import { useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterState } from "@/types";
import {
  headcountOptions,
  managementLevelOptions,
  popularJobTitles,
  popularLocations,
} from "@/data/mockData";

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onPreview: () => void;
  onSaveSearch: () => void;
  onClearFilters: () => void;
}

interface FilterSectionConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const filterSections: FilterSectionConfig[] = [
  {
    id: "keyword",
    title: "People Keyword",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "jobTitle",
    title: "Job Title",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "companyWebsite",
    title: "Company Website",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "personLocation",
    title: "Person Location",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "companyLocation",
    title: "Company Location",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "headcount",
    title: "Company Headcount",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "managementLevel",
    title: "Management Level",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export default function FilterSidebar({
  filters,
  setFilters,
  onPreview,
  onSaveSearch,
  onClearFilters,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(["keyword", "jobTitle"]);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: keyof FilterState) => {
    if (e.key === "Enter" && inputValues[field]?.trim()) {
      const value = inputValues[field].trim();
      const currentArray = filters[field] as string[];
      if (!currentArray.includes(value)) {
        setFilters((prev) => ({
          ...prev,
          [field]: [...currentArray, value],
        }));
      }
      setInputValues((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const removeTag = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((v) => v !== value),
    }));
  };

  const toggleQuickOption = (field: keyof FilterState, value: string) => {
    const currentArray = filters[field] as string[];
    if (currentArray.includes(value)) {
      removeTag(field, value);
    } else {
      setFilters((prev) => ({
        ...prev,
        [field]: [...currentArray, value],
      }));
    }
  };

  const getFilterCount = (id: string): number => {
    switch (id) {
      case "keyword":
        return filters.keyword ? 1 : 0;
      case "jobTitle":
        return filters.jobTitles.length;
      case "companyWebsite":
        return filters.companyWebsites.length;
      case "personLocation":
        return filters.personLocations.length;
      case "companyLocation":
        return filters.companyLocations.length;
      case "headcount":
        return filters.headcountRanges.length;
      case "managementLevel":
        return filters.managementLevels.length;
      default:
        return 0;
    }
  };

  const renderFilterContent = (id: string) => {
    switch (id) {
      case "keyword":
        return (
          <div className="filter-content">
            <div className="filter-input-wrapper">
              <input
                type="text"
                className="filter-input"
                placeholder="Q Enter single keyword here..."
                value={filters.keyword}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, keyword: e.target.value }))
                }
              />
            </div>
            <p className="filter-hint">Search by name, skills, or bio keywords</p>
          </div>
        );

      case "jobTitle":
        return (
          <div className="filter-content">
            <div className="filter-input-wrapper">
              <input
                type="text"
                className="filter-input"
                placeholder="E.g: Manager, Software Engineer"
                value={inputValues.jobTitles || ""}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, jobTitles: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(e, "jobTitles")}
              />
            </div>
            {filters.jobTitles.length > 0 && (
              <div className="filter-tags">
                {filters.jobTitles.map((title) => (
                  <span key={title} className="filter-tag">
                    {title}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeTag("jobTitles", title)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="quick-options">
              {popularJobTitles.map((title) => (
                <button
                  key={title}
                  className={`quick-option ${filters.jobTitles.includes(title) ? "selected" : ""}`}
                  onClick={() => toggleQuickOption("jobTitles", title)}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        );

      case "companyWebsite":
        return (
          <div className="filter-content">
            <div className="filter-input-wrapper">
              <input
                type="text"
                className="filter-input"
                placeholder="E.g: Google.com, LinkedIn.com"
                value={inputValues.companyWebsites || ""}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, companyWebsites: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(e, "companyWebsites")}
              />
            </div>
            {filters.companyWebsites.length > 0 && (
              <div className="filter-tags">
                {filters.companyWebsites.map((website) => (
                  <span key={website} className="filter-tag">
                    {website}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeTag("companyWebsites", website)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case "personLocation":
        return (
          <div className="filter-content">
            <div className="filter-input-wrapper">
              <input
                type="text"
                className="filter-input"
                placeholder="Eg: London, Great New York City"
                value={inputValues.personLocations || ""}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, personLocations: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(e, "personLocations")}
              />
            </div>
            {filters.personLocations.length > 0 && (
              <div className="filter-tags">
                {filters.personLocations.map((location) => (
                  <span key={location} className="filter-tag">
                    {location}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeTag("personLocations", location)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="quick-options">
              {popularLocations.map((location) => (
                <button
                  key={location}
                  className={`quick-option ${filters.personLocations.includes(location) ? "selected" : ""}`}
                  onClick={() => toggleQuickOption("personLocations", location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        );

      case "companyLocation":
        return (
          <div className="filter-content">
            <div className="filter-input-wrapper">
              <input
                type="text"
                className="filter-input"
                placeholder="E.g: United States, UAE"
                value={inputValues.companyLocations || ""}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, companyLocations: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(e, "companyLocations")}
              />
            </div>
            {filters.companyLocations.length > 0 && (
              <div className="filter-tags">
                {filters.companyLocations.map((location) => (
                  <span key={location} className="filter-tag">
                    {location}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeTag("companyLocations", location)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case "headcount":
        return (
          <div className="filter-content">
            <div className="quick-options">
              {headcountOptions.map((option) => (
                <button
                  key={option}
                  className={`quick-option ${filters.headcountRanges.includes(option) ? "selected" : ""}`}
                  onClick={() => toggleQuickOption("headcountRanges", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "managementLevel":
        return (
          <div className="filter-content">
            <div className="quick-options">
              {managementLevelOptions.map((option) => (
                <button
                  key={option}
                  className={`quick-option ${filters.managementLevels.includes(option) ? "selected" : ""}`}
                  onClick={() => toggleQuickOption("managementLevels", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-scroll">
        {filterSections.map((section) => {
          const isOpen = openSections.includes(section.id);
          const count = getFilterCount(section.id);

          return (
            <div
              key={section.id}
              className={`filter-section ${count > 0 ? "active" : ""}`}
            >
              <div className="filter-header" onClick={() => toggleSection(section.id)}>
                <div className="filter-header-left">
                  <div className="filter-icon">{section.icon}</div>
                  <span className="filter-title">{section.title}</span>
                  {count > 0 && <span className="filter-badge">{count}</span>}
                </div>
                <svg
                  className={`filter-chevron ${isOpen ? "open" : ""}`}
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

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    {renderFilterContent(section.id)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="filter-actions">
        <button className="btn btn-secondary" onClick={onSaveSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          Save Search
        </button>
        <button className="btn btn-primary" onClick={onPreview}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Preview Result
        </button>
      </div>
    </aside>
  );
}
