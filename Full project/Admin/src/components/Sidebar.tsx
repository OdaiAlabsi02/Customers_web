import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Settings,
  Calendar,
  Star,
  Plus,
  Search,
  File,
  Clock,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({
    operations: true,
    services: true,
    support: true
  });

  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Settings,
      group: "main"
    },
    {
      id: "garages",
      label: "Garage Management",
      icon: Settings,
      group: "operations"
    },
    {
      id: "users",
      label: "User Management",
      icon: Settings,
      group: "operations"
    },
    {
      id: "bookings",
      label: "Booking Management",
      icon: Calendar,
      group: "operations"
    },
    {
      id: "services",
      label: "Service Catalog",
      icon: Star,
      group: "services"
    },
    {
      id: "payments",
      label: "Payment Oversight",
      icon: Plus,
      group: "operations"
    },
    {
      id: "support",
      label: "Support & Chat",
      icon: Search,
      group: "support"
    },
    {
      id: "feedback",
      label: "Reviews & Quality",
      icon: Star,
      group: "support"
    },
    {
      id: "logistics",
      label: "Pickup & Delivery",
      icon: Clock,
      group: "operations"
    },
    {
      id: "promotions",
      label: "Promotions",
      icon: Plus,
      group: "services"
    }
  ];

  const groupedItems = {
    main: menuItems.filter(item => item.group === "main"),
    operations: menuItems.filter(item => item.group === "operations"),
    services: menuItems.filter(item => item.group === "services"),
    support: menuItems.filter(item => item.group === "support")
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Garagat</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="mt-3 w-full"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {/* Main Section */}
        {groupedItems.main.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              activeSection === item.id && "bg-orange-50 text-orange-600 border-l-2 border-orange-500"
            )}
            onClick={() => setActiveSection(item.id)}
          >
            <item.icon className="h-4 w-4 mr-2" />
            {!collapsed && item.label}
          </Button>
        ))}

        {/* Operations Group */}
        {!collapsed && (
          <div className="pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleGroup("operations")}
              className="w-full justify-between text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Operations
              {expandedGroups.operations ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </Button>
            {expandedGroups.operations && (
              <div className="ml-2 space-y-1 mt-2">
                {groupedItems.operations.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeSection === item.id && "bg-orange-50 text-orange-600"
                    )}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Group */}
        {!collapsed && (
          <div className="pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleGroup("services")}
              className="w-full justify-between text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Services
              {expandedGroups.services ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </Button>
            {expandedGroups.services && (
              <div className="ml-2 space-y-1 mt-2">
                {groupedItems.services.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeSection === item.id && "bg-orange-50 text-orange-600"
                    )}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Support Group */}
        {!collapsed && (
          <div className="pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleGroup("support")}
              className="w-full justify-between text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Support
              {expandedGroups.support ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </Button>
            {expandedGroups.support && (
              <div className="ml-2 space-y-1 mt-2">
                {groupedItems.support.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeSection === item.id && "bg-orange-50 text-orange-600"
                    )}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
