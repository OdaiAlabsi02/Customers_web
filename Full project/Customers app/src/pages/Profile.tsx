import React, { useState, useEffect } from 'react';
import { User, Edit2, Car, Settings, Bell, Shield, CreditCard, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '../lib/supabaseClient';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    promotions: false,
    reminders: true,
    newsletter: false
  });

  const vehicles = [
    {
      id: '1',
      make: 'BMW',
      model: 'X5',
      year: '2022',
      color: 'Space Gray',
      plateNumber: 'A 12345',
      isDefault: true
    },
    {
      id: '2',
      make: 'Mercedes',
      model: 'C-Class',
      year: '2021',
      color: 'White',
      plateNumber: 'B 67890',
      isDefault: false
    }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setProfileData(null);
        setLoading(false);
        return;
      }
      const userId = session.user.id;
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
      if (error) {
        setProfileData(null);
      } else {
        setProfileData(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Profile saved:', profileData);
  };

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev: any) => {
      if (field === 'profile_data') {
        return { ...prev, profile_data: value };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-white py-16" style={{ background: 'linear-gradient(to right, #FF6B35, #e55a2b)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            {loading ? (
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Loading...</h1>
            ) : profileData ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {(profileData?.profile_data?.first_name || '') + ' ' + (profileData?.profile_data?.last_name || '')}
                </h1>
                <p className="text-xl text-white">{profileData.email}</p>
              </>
            ) : (
              <h1 className="text-4xl md:text-5xl font-bold mb-2">No profile found</h1>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.href = '/login';
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData?.profile_data?.first_name || ''}
                      onChange={(e) => handleInputChange('profile_data', { ...profileData.profile_data, first_name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData?.profile_data?.last_name || ''}
                      onChange={(e) => handleInputChange('profile_data', { ...profileData.profile_data, last_name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData?.profile_data?.phone || ''}
                    onChange={(e) => handleInputChange('profile_data', { ...profileData.profile_data, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData?.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Vehicles</CardTitle>
                    <CardDescription>Manage your registered vehicles</CardDescription>
                  </div>
                  <Button style={{ backgroundColor: '#FF6B35' }}>
                    <Car className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-gray-600">Color: {vehicle.color}</p>
                          <p className="text-gray-600">Plate: {vehicle.plateNumber}</p>
                          {vehicle.isDefault && (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2">
                              Default Vehicle
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" variant="destructive">Remove</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bookingUpdates">Booking Updates</Label>
                    <p className="text-sm text-gray-600">Get notified about booking confirmations and updates</p>
                  </div>
                  <Switch
                    id="bookingUpdates"
                    checked={notifications.bookingUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('bookingUpdates', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotions">Promotions & Offers</Label>
                    <p className="text-sm text-gray-600">Receive special offers and promotional content</p>
                  </div>
                  <Switch
                    id="promotions"
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reminders">Service Reminders</Label>
                    <p className="text-sm text-gray-600">Get reminders for upcoming services</p>
                  </div>
                  <Switch
                    id="reminders"
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => handleNotificationChange('reminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-gray-600">Receive our monthly newsletter</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
