import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { GarageManagement } from "@/components/GarageManagement";
import { BookingManagement } from "@/components/BookingManagement";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { SidebarProvider } from "@/components/ui/sidebar";
import Users from "./Users";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "garages":
        return <GarageManagement />;
      case "users":
        return <Users />;
      case "bookings":
        return <BookingManagement />;
      case "services":
        return <ServiceCatalog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
