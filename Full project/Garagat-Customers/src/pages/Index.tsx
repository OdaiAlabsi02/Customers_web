import React, { useEffect, useState } from 'react';
import { Search, Filter, MapPin, Star, Shield, Clock } from 'lucide-react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '../lib/supabaseClient';

const Index = () => {
  const featuredServices = [
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
    }
  ];

  const categories = [
    { name: 'Detailing', icon: '✨', count: 12 },
    { name: 'PPF & Wrapping', icon: '🛡️', count: 8 },
    { name: 'Window Tinting', icon: '🪟', count: 15 },
    { name: 'Maintenance', icon: '🔧', count: 20 },
    { name: 'Battery Service', icon: '🔋', count: 18 },
    { name: 'Oil Change', icon: '🛢️', count: 25 }
  ];

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        setError(error.message);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-white py-16" style={{ 
        background: 'linear-gradient(to right, #FF6B35, #e55a2b)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Premium Car Care
              <span className="block text-white">At Your Doorstep</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              Professional automotive services with hassle-free pickup and delivery across UAE
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-400 ml-2" />
                  <Input 
                    placeholder="Search for services..." 
                    className="border-0 focus-visible:ring-0 text-gray-900"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">Dubai, UAE</span>
                </div>
                <Button style={{ backgroundColor: '#FF6B35' }} className="hover:opacity-90">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Garagat */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Garagat?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" 
                   style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
                <Shield className="h-8 w-8" style={{ color: '#FF6B35' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">5-Year Warranty</h3>
              <p className="text-gray-600">All our premium services come with comprehensive warranty coverage for your peace of mind.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hassle-Free Service</h3>
              <p className="text-gray-600">We pick up your car, perform the service, and deliver it back to you - all at your convenience.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Garages</h3>
              <p className="text-gray-600">All partner garages are thoroughly vetted and rated by our community for quality assurance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white py-12" style={{ backgroundColor: '#FF6B35' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Give Your Car the Care It Deserves?</h2>
          <p className="text-xl mb-8 text-white">Join thousands of satisfied customers who trust Garagat for their automotive needs.</p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary">
              Browse Services
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#FF6B35] transition-colors">
              Download App
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Users from Supabase</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.email} ({user.role})</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Index;
