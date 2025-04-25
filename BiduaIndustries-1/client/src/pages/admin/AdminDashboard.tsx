
import { useState } from "react";
import { motion } from "framer-motion";
import { LeadsManagement } from "@/components/admin/LeadsManagement";
import { TicketManagement } from "@/components/admin/TicketManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, TrendingUp, Bell, Building2, Package2, Cloud, Sparkles, Cpu } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const leadsByDivision = [
  { division: "Naploo", leads: 45, color: "#0088FE" },
  { division: "Beauty", leads: 30, color: "#00C49F" },
  { division: "CloudDrive", leads: 25, color: "#FFBB28" },
  { division: "OEM", leads: 35, color: "#FF8042" },
  { division: "IT", leads: 28, color: "#8884d8" }
];

const ticketStatus = [
  { status: "Open", value: 30, color: "#FF4842" },
  { status: "In Progress", value: 45, color: "#FFC107" },
  { status: "Resolved", value: 85, color: "#54D62C" }
];

const monthlyLeads = [
  { month: 'Jan', Naploo: 40, Beauty: 24, CloudDrive: 20, OEM: 27, IT: 18 },
  { month: 'Feb', Naploo: 30, Beauty: 28, CloudDrive: 25, OEM: 25, IT: 22 },
  { month: 'Mar', Naploo: 45, Beauty: 32, CloudDrive: 30, OEM: 31, IT: 28 },
  { month: 'Apr', Naploo: 50, Beauty: 35, CloudDrive: 28, OEM: 28, IT: 25 }
];

const divisions = [
  { id: "naploo", name: "Naploo", icon: Building2, count: 45 },
  { id: "beauty", name: "Beauty Care", icon: Sparkles, count: 30 },
  { id: "cloud", name: "CloudDrive", icon: Cloud, count: 25 },
  { id: "oem", name: "OEM Solutions", icon: Package2, count: 35 },
  { id: "it", name: "IT Connect", icon: Cpu, count: 28 }
];

export default function AdminDashboard() {
  const [selectedDivision, setSelectedDivision] = useState("all");

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Welcome to BIDUA Admin</h1>
        <p className="text-muted-foreground">Manage your business operations</p>
      </motion.div>

      {/* Division Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {divisions.map((division, index) => (
          <motion.div
            key={division.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`cursor-pointer ${selectedDivision === division.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedDivision(division.id)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <division.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{division.name}</p>
                    <p className="text-2xl font-bold">{division.count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads by Division</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsByDivision}
                    dataKey="leads"
                    nameKey="division"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {leadsByDivision.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyLeads}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Naploo" fill="#0088FE" />
                  <Bar dataKey="Beauty" fill="#00C49F" />
                  <Bar dataKey="CloudDrive" fill="#FFBB28" />
                  <Bar dataKey="OEM" fill="#FF8042" />
                  <Bar dataKey="IT" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="bg-card border">
          <TabsTrigger value="leads">Leads Management</TabsTrigger>
          <TabsTrigger value="tickets">Ticket Management</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="leads">
          <LeadsManagement selectedDivision={selectedDivision} />
        </TabsContent>

        <TabsContent value="tickets">
          <TicketManagement />
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Product management will be implemented in the next phase */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">Product management features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Partner Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Partner management will be implemented in the next phase */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">Partner management features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
