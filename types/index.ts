export interface Person {
  id: string;
  name: string;
  title: string;
  headline: string;
  linkedinUrl: string;
  company: string;
  companyUrl: string;
  location: string;
  companyLocation: string;
  headcount: string;
  managementLevel: string;
}

export interface FilterState {
  keyword: string;
  jobTitles: string[];
  companyWebsites: string[];
  personLocations: string[];
  companyLocations: string[];
  headcountRanges: string[];
  managementLevels: string[];
}

export interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  badge?: number;
  children: React.ReactNode;
}
