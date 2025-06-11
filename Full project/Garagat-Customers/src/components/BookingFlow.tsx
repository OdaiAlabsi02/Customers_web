import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, Car, ChevronLeft, ChevronRight, Plus, Home, Building, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, isSameDay, addHours, setHours, setMinutes, isAfter } from 'date-fns';

interface BookingFlowProps {
  serviceName: string;
  price: number;
  onBookingComplete: () => void;
}

// Example garage working hours (you should fetch this from the garage's data)
const GARAGE_HOURS = {
  start: 8, // 8 AM
  end: 22, // 10 PM
};

const BookingFlow: React.FC<BookingFlowProps> = ({ serviceName, price, onBookingComplete }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Date[]>([]);
  
  const [bookingData, setBookingData] = useState({
    carId: '',
    date: '',
    time: '',
    pickupAddress: '',
    deliveryAddress: '',
    specialInstructions: ''
  });

  const cars = [
    {
      id: 'car1',
      plate: 'Dubai A12345',
      model: '2022 Toyota Camry',
      color: 'White',
      image: '/placeholder.svg?height=100&width=150'
    },
    {
      id: 'car2',
      plate: 'Abu Dhabi B67890',
      model: '2021 BMW X5',
      color: 'Black',
      image: '/placeholder.svg?height=100&width=150'
    },
    {
      id: 'car3',
      plate: 'Sharjah C54321',
      model: '2023 Mercedes C-Class',
      color: 'Silver',
      image: '/placeholder.svg?height=100&width=150'
    }
  ];

  const savedAddresses = [
    {
      id: 'home',
      type: 'Home',
      icon: Home,
      address: 'Villa 123, Street 45, Al Barsha 1, Dubai',
      isDefault: true
    },
    {
      id: 'office',
      type: 'Office',
      icon: Building,
      address: 'Office 1204, Tower A, Business Bay, Dubai',
      isDefault: false
    }
  ];

  // Initialize visible dates
  useEffect(() => {
    const now = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => addDays(now, i));
    setVisibleDates(dates);
  }, []);

  // Generate available time slots when date is selected
  useEffect(() => {
    if (!selectedDate) return;

    const slots: Date[] = [];
    const now = new Date();
    const minimumTime = addHours(now, 1); // Earliest slot is 1 hour from now
    
    let currentSlot = setMinutes(setHours(selectedDate, GARAGE_HOURS.start), 0);
    const endTime = setHours(selectedDate, GARAGE_HOURS.end);

    while (isAfter(endTime, currentSlot)) {
      if (isSameDay(selectedDate, now)) {
        // For today, only show slots after minimumTime
        if (isAfter(currentSlot, minimumTime)) {
          slots.push(new Date(currentSlot));
        }
      } else {
        slots.push(new Date(currentSlot));
      }
      currentSlot = addMinutes(currentSlot, 30); // 30-minute intervals
    }

    setAvailableTimeSlots(slots);
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    updateBookingData('date', format(date, 'yyyy-MM-dd'));
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
    updateBookingData('time', format(time, 'HH:mm'));
  };

  const scrollDates = (direction: 'left' | 'right') => {
    const firstDate = visibleDates[0];
    const newDates = visibleDates.map(date => 
      addDays(date, direction === 'right' ? 7 : -7)
    );
    setVisibleDates(newDates);
  };

  // Helper function to add minutes to a date
  const addMinutes = (date: Date, minutes: number) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return bookingData.carId !== '';
      case 2:
        return selectedDate !== null && selectedTime !== null;
      case 3:
        return bookingData.pickupAddress !== '';
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in the required information before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (step < 4) {
      setStep(step + 1);
      toast({
        title: "Step completed!",
        description: `Moving to step ${step + 1}`,
      });
    } else {
      onBookingComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateBookingData = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            stepNum <= step ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {stepNum}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {step === 1 && <><Car className="h-5 w-5" /><span>Select Vehicle</span></>}
            {step === 2 && <><CalendarIcon className="h-5 w-5" /><span>Choose Date & Time</span></>}
            {step === 3 && <><MapPin className="h-5 w-5" /><span>Pickup & Delivery</span></>}
            {step === 4 && <><CreditCard className="h-5 w-5" /><span>Payment</span></>}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-900">
                    Select your vehicle
                  </label>
                  <Button variant="outline" size="sm" className="text-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                </div>
                <div className="grid gap-4">
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-orange-500 ${
                        bookingData.carId === car.id 
                          ? 'border-orange-600 bg-orange-50' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => updateBookingData('carId', car.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={car.image} 
                            alt={car.model}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{car.model}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>{car.plate}</span>
                            <span>•</span>
                            <span>{car.color}</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          bookingData.carId === car.id 
                            ? 'border-orange-600 bg-orange-600' 
                            : 'border-gray-300'
                        }`}>
                          {bookingData.carId === car.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Date
                </label>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                    onClick={() => scrollDates('left')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="overflow-hidden mx-8">
                    <div className="flex justify-between">
                      {visibleDates.map((date) => (
                        <Button
                          key={date.toISOString()}
                          variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                          className={`flex-1 mx-1 h-20 flex flex-col items-center justify-center ${
                            isSameDay(date, new Date()) ? 'border-orange-500' : ''
                          }`}
                          onClick={() => handleDateSelect(date)}
                        >
                          <span className="text-xs">{format(date, 'EEE')}</span>
                          <span className="text-lg font-bold">{format(date, 'd')}</span>
                          <span className="text-xs">{format(date, 'MMM')}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                    onClick={() => scrollDates('right')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time.toISOString()}
                        variant={selectedTime && isSameTime(time, selectedTime) ? "default" : "outline"}
                        className="py-6"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {format(time, 'h:mm a')}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Working Hours Notice */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Garage Working Hours: {GARAGE_HOURS.start}:00 AM - {GARAGE_HOURS.end}:00 PM
                </p>
                <p className="mt-2 text-xs">
                  * Earliest booking time is 1 hour from now
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Pickup Address */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-900">
                    Pickup Address
                  </label>
                  <Button variant="outline" size="sm" className="text-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                </div>
                <div className="grid gap-3">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-orange-500 ${
                        bookingData.pickupAddress === address.address 
                          ? 'border-orange-600 bg-orange-50' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => updateBookingData('pickupAddress', address.address)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${
                          bookingData.pickupAddress === address.address 
                            ? 'bg-orange-100' 
                            : 'bg-gray-100'
                        }`}>
                          <address.icon className={`h-5 w-5 ${
                            bookingData.pickupAddress === address.address 
                              ? 'text-orange-600' 
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{address.type}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{address.address}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          bookingData.pickupAddress === address.address 
                            ? 'border-orange-600 bg-orange-600' 
                            : 'border-gray-300'
                        }`}>
                          {bookingData.pickupAddress === address.address && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Current Location Option */}
                  <div
                    className="relative p-4 rounded-lg border-2 border-gray-200 transition-all cursor-pointer hover:border-orange-500"
                    onClick={() => {
                      // Handle current location selection
                      toast({
                        title: "Getting current location...",
                        description: "This would trigger the browser's geolocation API"
                      });
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <Navigation className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Use Current Location</h3>
                        <p className="text-sm text-gray-600">Get your exact location</p>
                      </div>
                    </div>
                  </div>

                  {/* Manual Address Entry */}
                  <div className="relative p-4 rounded-lg border-2 border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter address manually
                    </label>
                    <Textarea 
                      placeholder="Enter full address details"
                      value={bookingData.pickupAddress}
                      onChange={(e) => updateBookingData('pickupAddress', e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Delivery Address
                </label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sameAsPickup"
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      checked={!bookingData.deliveryAddress}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateBookingData('deliveryAddress', '');
                        }
                      }}
                    />
                    <label htmlFor="sameAsPickup" className="text-sm text-gray-700">
                      Same as pickup address
                    </label>
                  </div>

                  {bookingData.deliveryAddress && (
                    <div className="grid gap-3">
                      {savedAddresses.map((address) => (
                        <div
                          key={`delivery-${address.id}`}
                          className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-orange-500 ${
                            bookingData.deliveryAddress === address.address 
                              ? 'border-orange-600 bg-orange-50' 
                              : 'border-gray-200'
                          }`}
                          onClick={() => updateBookingData('deliveryAddress', address.address)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-2 rounded-lg ${
                              bookingData.deliveryAddress === address.address 
                                ? 'bg-orange-100' 
                                : 'bg-gray-100'
                            }`}>
                              <address.icon className={`h-5 w-5 ${
                                bookingData.deliveryAddress === address.address 
                                  ? 'text-orange-600' 
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{address.type}</h3>
                              <p className="mt-1 text-sm text-gray-600">{address.address}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              bookingData.deliveryAddress === address.address 
                                ? 'border-orange-600 bg-orange-600' 
                                : 'border-gray-300'
                            }`}>
                              {bookingData.deliveryAddress === address.address && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Manual Delivery Address Entry */}
                      <div className="relative p-4 rounded-lg border-2 border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Or enter delivery address manually
                        </label>
                        <Textarea 
                          placeholder="Enter full delivery address details"
                          value={bookingData.deliveryAddress}
                          onChange={(e) => updateBookingData('deliveryAddress', e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Special Instructions (Optional)
                </label>
                <Textarea 
                  placeholder="Any special requirements or notes for the service"
                  value={bookingData.specialInstructions}
                  onChange={(e) => updateBookingData('specialInstructions', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span>{bookingData.carId === 'car1' ? '2022 Toyota Camry' : bookingData.carId === 'car2' ? '2021 BMW X5' : '2023 Mercedes C-Class'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>
                      {selectedDate && selectedTime && 
                        `${format(selectedDate, 'MMM d, yyyy')} at ${format(selectedTime, 'h:mm a')}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Price:</span>
                    <span className="text-orange-600">{price} AED</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full" onClick={onBookingComplete}>
                  Pay with Credit Card - {price} AED
                </Button>
                <Button variant="outline" className="w-full" onClick={onBookingComplete}>
                  Pay with Tabby (4 payments of {Math.round(price/4)} AED)
                </Button>
                <Button variant="outline" className="w-full" onClick={onBookingComplete}>
                  Pay with Tamara
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className={step === 1 ? "w-full" : ""}
              disabled={!isStepValid()}
            >
              {step === 4 ? 'Complete Booking' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to compare times
const isSameTime = (date1: Date, date2: Date) => {
  return date1.getHours() === date2.getHours() && 
         date1.getMinutes() === date2.getMinutes();
};

export default BookingFlow;
