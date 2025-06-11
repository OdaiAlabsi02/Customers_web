
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Settings, Star, Clock } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Window Tinting",
    category: "Protection",
    basePrice: "$150 - $350",
    duration: "2-4 hours",
    garages: 42,
    bookings: 156,
    rating: 4.7,
    warranty: "5 years",
    status: "Active"
  },
  {
    id: 2,
    name: "Ceramic Coating",
    category: "Protection",
    basePrice: "$400 - $800",
    duration: "1-2 days",
    garages: 38,
    bookings: 89,
    rating: 4.8,
    warranty: "5 years",
    status: "Active"
  },
  {
    id: 3,
    name: "Paint Protection Film",
    category: "Protection",
    basePrice: "$800 - $2000",
    duration: "2-3 days",
    garages: 25,
    bookings: 67,
    rating: 4.9,
    warranty: "5 years",
    status: "Active"
  },
  {
    id: 4,
    name: "Color Wrapping",
    category: "Customization",
    basePrice: "$1200 - $3000",
    duration: "3-5 days",
    garages: 18,
    bookings: 34,
    rating: 4.6,
    warranty: "3 years",
    status: "Active"
  },
  {
    id: 5,
    name: "Ice Cleaning",
    category: "Maintenance",
    basePrice: "$80 - $150",
    duration: "1-2 hours",
    garages: 45,
    bookings: 234,
    rating: 4.5,
    warranty: "30 days",
    status: "Active"
  },
  {
    id: 6,
    name: "Engine Cleaning",
    category: "Maintenance",
    basePrice: "$120 - $250",
    duration: "1-3 hours",
    garages: 35,
    bookings: 123,
    rating: 4.4,
    warranty: "90 days",
    status: "Active"
  },
  {
    id: 7,
    name: "Roof Stars",
    category: "Customization",
    basePrice: "$200 - $500",
    duration: "4-6 hours",
    garages: 12,
    bookings: 18,
    rating: 4.8,
    warranty: "2 years",
    status: "Beta"
  }
];

export function ServiceCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Protection", "Customization", "Maintenance"];
  
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Beta": return "bg-blue-100 text-blue-800";
      case "Disabled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Protection": return "bg-orange-100 text-orange-800";
      case "Customization": return "bg-purple-100 text-purple-800";
      case "Maintenance": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Catalog</h1>
          <p className="text-gray-600">Manage platform-wide automotive services</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category}
                    </Badge>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-medium">{service.basePrice}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="font-medium">{service.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Available Garages</span>
                  <span className="font-medium">{service.garages}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-medium">{service.bookings}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Warranty</span>
                  <span className="font-medium">{service.warranty}</span>
                </div>
                
                <div className="flex gap-2 pt-3">
                  <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Edit Service
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{services.length}</div>
              <p className="text-sm text-gray-600">Total Services</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {services.filter(s => s.status === "Active").length}
              </div>
              <p className="text-sm text-gray-600">Active Services</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {services.reduce((acc, s) => acc + s.bookings, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(services.reduce((acc, s) => acc + s.rating, 0) / services.length).toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
