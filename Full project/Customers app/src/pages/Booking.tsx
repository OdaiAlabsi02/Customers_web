import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BookingFlow from '@/components/BookingFlow';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Get service data from navigation state or use defaults
  const serviceData = location.state || {
    serviceName: "Premium Car Detailing",
    price: 299,
    serviceId: "1"
  };

  const handleBookingComplete = () => {
    setIsBookingComplete(true);
    console.log('Booking completed for service:', serviceData);
    // Here you would typically make an API call to create the booking
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto pt-20 px-4">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Your booking for "{serviceData.serviceName}" has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>Booking Reference:</strong> GRT-{Date.now().toString().slice(-6)}
              </p>
              <p className="text-sm text-blue-800 mt-1">
                <strong>Total Amount:</strong> {serviceData.price} AED
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> The garage has 1 hour to accept your booking. 
                If they don't respond within this time, your booking will be automatically confirmed.
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')}>
              View My Bookings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Book Your Service</h1>
          <p className="text-gray-600">Complete your booking for "{serviceData.serviceName}" in just a few simple steps</p>
        </div>

        <BookingFlow 
          serviceName={serviceData.serviceName}
          price={serviceData.price}
          onBookingComplete={handleBookingComplete}
        />
      </div>
    </div>
  );
};

export default Booking;
