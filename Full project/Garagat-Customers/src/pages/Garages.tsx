
import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Shield, Phone } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Garages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const garages = [
    {
      id: '1',
      name: 'Elite Auto Care',
      description: 'Premium automotive services with state-of-the-art equipment and certified technicians.',
      location: 'Dubai Marina, Dubai',
      rating: 4.9,
      reviews: 156,
      services: ['Detailing', 'PPF', 'Window Tinting', 'Maintenance'],
      openingHours: '8:00 AM - 8:00 PM',
      isOpen: true,
      image: '/placeholder.svg?height=200&width=400',
      phone: '+971 4 123 4567',
      distance: '2.5 km'
    },
    {
      id: '2',
      name: 'Pro Service Center',
      description: 'Specialized in luxury car maintenance and high-end detailing services.',
      location: 'Business Bay, Dubai',
      rating: 4.8,
      reviews: 203,
      services: ['Maintenance', 'Battery Service', 'Oil Change'],
      openingHours: '7:00 AM - 9:00 PM',
      isOpen: true,
      image: '/placeholder.svg?height=200&width=400',
      phone: '+971 4 987 6543',
      distance: '3.2 km'
    },
    {
      id: '3',
      name: 'Perfect Finish Garage',
      description: 'Expert paint protection and detailing services with lifetime warranty options.',
      location: 'Al Quoz, Dubai',
      rating: 4.7,
      reviews: 89,
      services: ['PPF', 'Detailing', 'Paint Correction'],
      openingHours: '9:00 AM - 7:00 PM',
      isOpen: false,
      image: '/placeholder.svg?height=200&width=400',
      phone: '+971 4 555 0123',
      distance: '5.1 km'
    },
    {
      id: '4',
      name: 'Quick Fix Auto',
      description: 'Fast and reliable automotive services for busy professionals.',
      location: 'DIFC, Dubai',
      rating: 4.6,
      reviews: 124,
      services: ['Battery Service', 'Oil Change', 'Quick Maintenance'],
      openingHours: '24/7',
      isOpen: true,
      image: '/placeholder.svg?height=200&width=400',
      phone: '+971 4 777 8888',
      distance: '1.8 km'
    }
  ];

  const filteredGarages = garages.filter(garage =>
    garage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garage.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    garage.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-white py-16" style={{ background: 'linear-gradient(to right, #FF6B35, #e55a2b)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Trusted Garages</h1>
            <p className="text-xl mb-8 text-white">
              Discover verified automotive service centers near you
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-400 ml-2" />
                <Input 
                  placeholder="Search garages by name, location, or service..." 
                  className="border-0 focus-visible:ring-0 text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button style={{ backgroundColor: '#FF6B35' }} className="hover:opacity-90">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredGarages.length} Garages Found
          </h2>
          <p className="text-gray-600">Sorted by distance and rating</p>
        </div>

        {/* Garages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGarages.map((garage) => (
            <Card key={garage.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={garage.image} 
                  alt={garage.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{garage.rating}</span>
                    <span className="text-xs text-gray-500">({garage.reviews})</span>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    garage.isOpen 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {garage.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{garage.name}</CardTitle>
                <p className="text-gray-600 text-sm">{garage.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{garage.location}</span>
                  <span className="text-xs">({garage.distance})</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{garage.openingHours}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {garage.services.map((service, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" className="flex-1" style={{ backgroundColor: '#FF6B35' }}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredGarages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No garages found matching your search.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Garages;
