"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterSidebar from "@/components/FilterSidebar";
import ResultsTable from "@/components/ResultsTable";
import Header from "@/components/Header";
import { FilterState, Person } from "@/types";
import { mockPeople } from "@/data/mockData";

interface FindPeopleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FindPeopleModal({ isOpen, onClose }: FindPeopleModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    jobTitles: [],
    companyWebsites: [],
    personLocations: [],
    companyLocations: [],
    headcountRanges: [],
    managementLevels: [],
  });
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [creditsUsed, setCreditsUsed] = useState(8000);
  const totalCredits = 50000;

  const handlePreview = () => {
    setIsLoading(true);
    setTimeout(() => {
      let results = [...mockPeople];

      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(keyword) ||
            p.title.toLowerCase().includes(keyword) ||
            p.headline.toLowerCase().includes(keyword)
        );
      }

      if (filters.jobTitles.length > 0) {
        results = results.filter((p) =>
          filters.jobTitles.some((title) =>
            p.title.toLowerCase().includes(title.toLowerCase())
          )
        );
      }

      if (filters.personLocations.length > 0) {
        results = results.filter((p) =>
          filters.personLocations.some((loc) =>
            p.location.toLowerCase().includes(loc.toLowerCase())
          )
        );
      }

      if (filters.companyLocations.length > 0) {
        results = results.filter((p) =>
          filters.companyLocations.some((loc) =>
            p.companyLocation.toLowerCase().includes(loc.toLowerCase())
          )
        );
      }

      if (filters.managementLevels.length > 0) {
        results = results.filter((p) =>
          filters.managementLevels.some((level) =>
            p.managementLevel.toLowerCase().includes(level.toLowerCase())
          )
        );
      }

      setFilteredPeople(results);
      setHasSearched(true);
      setCreditsUsed((prev) => Math.min(prev + results.length * 10, totalCredits));
      setIsLoading(false);
    }, 1200);
  };

  const handleSaveSearch = () => {
    const searchName = `Search ${savedSearches.length + 1} - ${new Date().toLocaleDateString()}`;
    setSavedSearches((prev) => [...prev, searchName]);
  };

  const handleClearFilters = () => {
    setFilters({
      keyword: "",
      jobTitles: [],
      companyWebsites: [],
      personLocations: [],
      companyLocations: [],
      headcountRanges: [],
      managementLevels: [],
    });
    setFilteredPeople([]);
    setHasSearched(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="find-people-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Header
            creditsUsed={creditsUsed}
            totalCredits={totalCredits}
            savedSearches={savedSearches}
            showSavedSearches={showSavedSearches}
            setShowSavedSearches={setShowSavedSearches}
            onClose={onClose}
          />

          <div className="modal-content">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onPreview={handlePreview}
              onSaveSearch={handleSaveSearch}
              onClearFilters={handleClearFilters}
            />

            <ResultsTable
              people={filteredPeople}
              hasSearched={hasSearched}
              isLoading={isLoading}
              creditsUsed={creditsUsed}
              totalCredits={totalCredits}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

