
import React from 'react';
import { Car, Edit2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CarProfileCardProps {
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  type: string;
  lastService?: string;
}

const CarProfileCard: React.FC<CarProfileCardProps> = ({
  licensePlate,
  make,
  model,
  year,
  type,
  lastService
}) => {
  const navigate = useNavigate();

  const handleBookService = () => {
    // Navigate to booking page with pre-selected car info
    navigate('/booking', {
      state: {
        serviceName: "Select a Service",
        price: 0,
        preSelectedCar: `${licensePlate} - ${year} ${make} ${model}`
      }
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-5 w-5" style={{ color: '#FF6B35' }} />
            <span className="text-lg">{licensePlate}</span>
          </div>
          <Button variant="ghost" size="sm">
            <Edit2 className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle:</span>
            <span className="font-medium">{year} {make} {model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium">{type}</span>
          </div>
          {lastService && (
            <div className="flex justify-between">
              <span className="text-gray-600">Last Service:</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{lastService}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full" onClick={handleBookService}>
            Book Service for this Car
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarProfileCard;
