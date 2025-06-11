
import React, { useState } from 'react';
import { Plus, Bell, Star, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import CarProfileCard from '@/components/CarProfileCard';
import OrderStatusTracker from '@/components/OrderStatusTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const carProfiles = [
    {
      licensePlate: 'Dubai A12345',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      type: 'Sedan',
      lastService: '15 Mar 2024'
    },
    {
      licensePlate: 'Abu Dhabi B67890',
      make: 'BMW',
      model: 'X5',
      year: 2021,
      type: 'SUV',
      lastService: '28 Feb 2024'
    }
  ];

  const currentBookings = [
    {
      id: '1',
      serviceName: 'Premium Car Detailing',
      garageName: 'Elite Auto Care',
      carLicense: 'Dubai A12345',
      status: 'in-service',
      estimatedCompletion: '2 hours',
      orderStatuses: [
        { id: '1', status: 'picked-up' as const, timestamp: '09:00 AM', isCompleted: true, isCurrent: false },
        { id: '2', status: 'arrived-garage' as const, timestamp: '09:30 AM', isCompleted: true, isCurrent: false },
        { id: '3', status: 'in-service' as const, timestamp: '10:00 AM', isCompleted: false, isCurrent: true },
        { id: '4', status: 'finished' as const, isCompleted: false, isCurrent: false },
        { id: '5', status: 'returned' as const, isCompleted: false, isCurrent: false }
      ]
    }
  ];

  const pastBookings = [
    {
      id: '2',
      serviceName: 'Paint Protection Film',
      garageName: 'Pro Shield Garage',
      carLicense: 'Abu Dhabi B67890',
      completedDate: '10 Mar 2024',
      rating: 5,
      total: 2500
    },
    {
      id: '3',
      serviceName: 'Window Tinting',
      garageName: 'Crystal Clear Auto',
      carLicense: 'Dubai A12345',
      completedDate: '25 Feb 2024',
      rating: 4,
      total: 450
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600">Manage your vehicles and track your services</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Service
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="cars">My Cars</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
              {currentBookings.length > 0 ? (
                <div className="grid gap-6">
                  {currentBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg">{booking.serviceName}</h3>
                            <p className="text-gray-600">{booking.garageName}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Vehicle: {booking.carLicense}</span>
                            <p className="text-sm text-orange-600">Est. completion: {booking.estimatedCompletion}</p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <OrderStatusTracker 
                          orderStatuses={booking.orderStatuses}
                          serviceType="detailing"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Bookings</h3>
                    <p className="text-gray-600 mb-4">You don't have any active service bookings at the moment.</p>
                    <Button>Book a Service</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Vehicles</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carProfiles.map((car, index) => (
                <CarProfileCard key={index} {...car} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-xl font-semibold">Service History</h2>
            
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{booking.serviceName}</h3>
                        <p className="text-gray-600">{booking.garageName}</p>
                        <p className="text-sm text-gray-500">Vehicle: {booking.carLicense}</p>
                        <p className="text-sm text-gray-500">Completed: {booking.completedDate}</p>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="font-semibold">{booking.total} AED</p>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
