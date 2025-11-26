"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";
import FindPeopleModal from "@/components/FindPeopleModal";
import Toast from "@/components/Toast";

export default function Home() {
  const [isFindPeopleOpen, setIsFindPeopleOpen] = useState(false);
  const [isFindCompaniesOpen, setIsFindCompaniesOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

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
          onFindCompanies={() => {
            setIsFindCompaniesOpen(true);
            setToast({ message: "Find Companies feature coming soon!", type: "info" });
          }}
          onFindPeople={() => setIsFindPeopleOpen(true)}
          onNewGrid={() => {
            setToast({ message: "New Grid created successfully!", type: "success" });
          }}
        />
      </div>
      <FindPeopleModal
        isOpen={isFindPeopleOpen}
        onClose={() => setIsFindPeopleOpen(false)}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
