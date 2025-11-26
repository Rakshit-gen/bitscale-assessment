"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";
import FindPeopleModal from "@/components/FindPeopleModal";

export default function Home() {
  const [isFindPeopleOpen, setIsFindPeopleOpen] = useState(false);
  const [isFindCompaniesOpen, setIsFindCompaniesOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader
          onFindCompanies={() => setIsFindCompaniesOpen(true)}
          onFindPeople={() => setIsFindPeopleOpen(true)}
          onNewGrid={() => console.log("New Grid")}
        />
        <DashboardContent
          onFindCompanies={() => setIsFindCompaniesOpen(true)}
          onFindPeople={() => setIsFindPeopleOpen(true)}
          onNewGrid={() => console.log("New Grid")}
        />
      </div>
      <FindPeopleModal
        isOpen={isFindPeopleOpen}
        onClose={() => setIsFindPeopleOpen(false)}
      />
    </div>
  );
}
