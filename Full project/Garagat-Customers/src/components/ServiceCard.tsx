
import React from 'react';
import { Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  warranty: string;
  image: string;
  isAvailable: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  price,
  duration,
  rating,
  warranty,
  image,
  isAvailable
}) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (isAvailable) {
      // Pass service data through URL state to booking page
      navigate('/booking', { 
        state: { 
          serviceId: id,
          serviceName: name,
          price: price 
        } 
      });
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${!isAvailable ? 'opacity-50 grayscale' : 'hover:scale-105'}`}>
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white font-semibold bg-black bg-opacity-60 px-3 py-1 rounded">Currently Closed</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>{warranty}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold" style={{ color: '#FF6B35' }}>{price} AED</span>
            <span className="text-gray-500 text-sm ml-1">starting from</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!isAvailable}
          variant={isAvailable ? "default" : "secondary"}
          onClick={handleBookNow}
        >
          {isAvailable ? 'Book Now' : 'Currently Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
