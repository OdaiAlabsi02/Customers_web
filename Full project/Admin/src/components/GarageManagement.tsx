import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Settings } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface GarageUser {
  id: string;
  email: string;
  approval_status?: string;
  profile_data: {
    garage_name?: string;
    webname?: string;
    trade_license?: string;
    phone?: string;
    [key: string]: any;
  } | null;
  created_at?: string;
}

export function GarageManagement() {
  const [garages, setGarages] = useState<GarageUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGarages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "garage")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setGarages(data as GarageUser[]);
      }
      setLoading(false);
    };
    fetchGarages();
  }, []);

  const handleApprove = async (garageId: string) => {
    const { error } = await supabase
      .from('users')
      .update({ approval_status: 'approved' })
      .eq('id', garageId);

    if (!error) {
      setGarages((prev) =>
        prev.map((g) =>
          g.id === garageId ? { ...g, approval_status: 'approved' } : g
        )
      );
    } else {
      alert('Failed to approve garage: ' + error.message);
    }
  };

  const filteredGarages = garages.filter((garage) => {
    const name = `${garage.profile_data?.garage_name || ''}`.toLowerCase();
    const email = garage.email.toLowerCase();
    const phone = garage.profile_data?.phone?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return (
      name.includes(term) ||
      email.includes(term) ||
      phone.includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Garage Management</h1>
          <p className="text-gray-600">Manage garage onboarding and operations</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Garage
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search garages by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGarages.map((garage) => (
                <Card key={garage.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {garage.profile_data?.garage_name || ''}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{garage.email}</p>
                        <p className="text-xs mt-1">
                          Status: {garage.approval_status === 'approved' ? (
                            <span className="text-green-600 font-semibold">Approved</span>
                          ) : (
                            <span className="text-yellow-600 font-semibold">Pending Approval</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Phone</span>
                        <span className="font-medium">{garage.profile_data?.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Webname</span>
                        <span className="font-medium">{garage.profile_data?.webname || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Trade License</span>
                        <span className="font-medium">{garage.profile_data?.trade_license || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Joined</span>
                        <span className="font-medium">{garage.created_at ? new Date(garage.created_at).toLocaleDateString() : ''}</span>
                      </div>
                      {garage.approval_status !== 'approved' && (
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600" onClick={() => handleApprove(garage.id)}>
                            Approve
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
