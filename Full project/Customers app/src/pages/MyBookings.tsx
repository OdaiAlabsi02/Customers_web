import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Shield, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const bookings = {
    ongoing: [
      {
        id: '3',
        serviceName: 'Paint Protection Film (PPF)',
        garageName: 'Perfect Finish Garage',
        date: '2024-06-08',
        time: '9:00 AM',
        status: 'in-progress',
        price: 2500,
        location: 'Al Quoz, Dubai',
        phone: '+971 4 555 0123',
        image: '/placeholder.svg?height=100&width=150',
        progress: 60
      }
    ],
    completed: [
      {
        id: '4',
        serviceName: 'Battery Replacement',
        garageName: 'Pro Service Center',
        date: '2024-05-28',
        time: '11:00 AM',
        status: 'completed',
        price: 350,
        location: 'Business Bay, Dubai',
        phone: '+971 4 987 6543',
        image: '/placeholder.svg?height=100&width=150',
        rating: 5,
        warrantyEnd: '2025-05-28'
      },
      {
        id: '5',
        serviceName: 'Window Tinting',
        garageName: 'Elite Auto Care',
        date: '2024-05-15',
        time: '3:00 PM',
        status: 'completed',
        price: 450,
        location: 'Dubai Marina, Dubai',
        phone: '+971 4 123 4567',
        image: '/placeholder.svg?height=100&width=150',
        rating: 4,
        warrantyEnd: '2026-05-15'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const BookingCard = ({ booking, showActions = true }: { booking: any; showActions?: boolean }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <img 
            src={booking.image} 
            alt={booking.serviceName}
            className="w-full md:w-32 h-24 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-2">{booking.garageName}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{booking.location}</span>
              </div>
            </div>
            
            {booking.progress && (
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{booking.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      backgroundColor: '#FF6B35', 
                      width: `${booking.progress}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
            
            {booking.rating && (
              <div className="flex items-center space-x-1 mb-3">
                <span className="text-sm text-gray-600">Your rating:</span>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < booking.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold" style={{ color: '#FF6B35' }}>
                {booking.price} AED
              </span>
              
              {showActions && (
                <div className="flex space-x-2">
                  {booking.status === 'completed' && (
                    <>
                      {!booking.rating && (
                        <Button size="sm" style={{ backgroundColor: '#FF6B35' }}>
                          Review Service
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Warranty
                        {booking.warrantyEnd && (
                          <span className="ml-1 text-xs">
                            (Until {new Date(booking.warrantyEnd).toLocaleDateString()})
                          </span>
                        )}
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Support
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-white py-16" style={{ background: 'linear-gradient(to right, #FF6B35, #e55a2b)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
            <p className="text-xl text-white">
              Track and manage your automotive service appointments
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ongoing">
              Ongoing ({bookings.ongoing.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({bookings.completed.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing" className="mt-6">
            {bookings.ongoing.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No ongoing bookings</p>
              </div>
            ) : (
              bookings.ongoing.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            {bookings.completed.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No completed bookings</p>
              </div>
            ) : (
              bookings.completed.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyBookings;
