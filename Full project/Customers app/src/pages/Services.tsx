
import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Services = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: '1',
      name: 'Premium Car Detailing',
      description: 'Complete interior and exterior detailing with premium products. Includes wash, wax, interior cleaning, and leather conditioning.',
      price: 299,
      duration: '3-4 hours',
      rating: 4.8,
      warranty: '1 month',
      image: '/placeholder.svg?height=200&width=400',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Paint Protection Film (PPF)',
      description: 'High-quality paint protection film installation to protect your car from scratches, stone chips, and environmental damage.',
      price: 2500,
      duration: '1-2 days',
      rating: 4.9,
      warranty: '5 years',
      image: '/placeholder.svg?height=200&width=400',
      isAvailable: true
    },
    {
      id: '3',
      name: 'Window Tinting',
      description: 'Professional window tinting service with premium films. UV protection and enhanced privacy for your vehicle.',
      price: 450,
      duration: '2-3 hours',
      rating: 4.7,
      warranty: '2 years',
      image: '/placeholder.svg?height=200&width=400',
      isAvailable: false
    },
    {
      id: '4',
      name: 'Battery Replacement',
      description: 'Quick and professional battery replacement service with high-quality batteries. Includes free battery testing.',
      price: 350,
      duration: '30 mins',
      rating: 4.6,
      warranty: '1 year',
      image: '/placeholder.svg?height=200&width=400',
      isAvailable: true
    },
    {
      id: '5',
      name: 'Oil Change Service',
      description: 'Complete oil change service with premium synthetic oil. Includes oil filter replacement and basic inspection.',
      price: 150,
      duration: '45 mins',
      rating: 4.5,
      warranty: '6 months',
      image: '/placeholder.svg?height=200&width=400',
      isAvailable: true
    },
    {
      id: '6',
      name: 'Brake Pad Replacement',
      description: 'Professional brake pad replacement with high-quality parts. Includes brake system inspection and testing.',
      price: 800,
      duration: '2 hours',
      rating: 4.8,
      warranty: '1 year',
      image: '/placeholder.svg?height=200&width=400',
      isAvailable: true
    }
  ];

  const categories = [
    { name: 'All Services', count: services.length },
    { name: 'Detailing', count: 2 },
    { name: 'PPF & Wrapping', count: 1 },
    { name: 'Window Tinting', count: 1 },
    { name: 'Maintenance', count: 3 },
    { name: 'Battery Service', count: 1 }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-white py-16" style={{ background: 'linear-gradient(to right, #FF6B35, #e55a2b)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl mb-8 text-white">
              Professional automotive services delivered to your doorstep
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-3" />
                  <span className="text-gray-700">Under 200 AED</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-3" />
                  <span className="text-gray-700">200 - 500 AED</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-3" />
                  <span className="text-gray-700">500 - 1000 AED</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-3" />
                  <span className="text-gray-700">Above 1000 AED</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search services..."
                    className="border-0 focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredServices.length} of {services.length} services
              </p>
            </div>

            {/* Services Grid */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
