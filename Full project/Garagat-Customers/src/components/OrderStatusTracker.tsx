
import React from 'react';
import { Check, Clock, Car, Wrench, Sparkles, Package } from 'lucide-react';

interface OrderStatus {
  id: string;
  status: 'picked-up' | 'arrived-garage' | 'in-service' | 'detailing' | 'installing' | 'finished' | 'returned';
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderStatusTrackerProps {
  orderStatuses: OrderStatus[];
  serviceType: 'ppf' | 'detailing' | 'maintenance' | 'other';
}

const OrderStatusTracker: React.FC<OrderStatusTrackerProps> = ({ orderStatuses, serviceType }) => {
  const getStatusIcon = (status: string, isCompleted: boolean, isCurrent: boolean) => {
    const iconClass = `h-5 w-5 ${
      isCompleted ? 'text-green-600' : 
      isCurrent ? 'text-orange-600' : 'text-gray-400'
    }`;
    
    switch (status) {
      case 'picked-up':
        return <Car className={iconClass} />;
      case 'arrived-garage':
        return <Package className={iconClass} />;
      case 'in-service':
      case 'detailing':
        return <Wrench className={iconClass} />;
      case 'installing':
        return <Sparkles className={iconClass} />;
      case 'finished':
      case 'returned':
        return <Check className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'picked-up':
        return 'Vehicle Picked Up';
      case 'arrived-garage':
        return 'Arrived at Garage';
      case 'in-service':
        return 'Service in Progress';
      case 'detailing':
        return 'Detailing Phase';
      case 'installing':
        return 'Installation Phase';
      case 'finished':
        return 'Service Completed';
      case 'returned':
        return 'Vehicle Returned';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Order Status</h3>
      
      <div className="space-y-4">
        {orderStatuses.map((statusItem, index) => (
          <div key={statusItem.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              statusItem.isCompleted 
                ? 'bg-green-50 border-green-200' 
                : statusItem.isCurrent
                ? 'bg-orange-50 border-orange-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              {getStatusIcon(statusItem.status, statusItem.isCompleted, statusItem.isCurrent)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                statusItem.isCompleted ? 'text-green-900' :
                statusItem.isCurrent ? 'text-orange-900' : 'text-gray-500'
              }`}>
                {getStatusLabel(statusItem.status)}
              </p>
              {statusItem.timestamp && (
                <p className="text-xs text-gray-500 mt-1">
                  {statusItem.timestamp}
                </p>
              )}
            </div>
            
            {index < orderStatuses.length - 1 && (
              <div className={`absolute left-[1.25rem] mt-10 w-0.5 h-6 ${
                statusItem.isCompleted ? 'bg-green-200' : 'bg-gray-200'
              }`} style={{ position: 'relative', left: '1.25rem' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusTracker;
