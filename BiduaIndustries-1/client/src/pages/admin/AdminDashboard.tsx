
import { useState } from "react";
import { motion } from "framer-motion";
import { LeadsManagement } from "@/components/admin/LeadsManagement";
import { TicketManagement } from "@/components/admin/TicketManagement";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, MessageSquare, TrendingUp, Bell, Building2, 
  Package2, Cloud, Sparkles, Cpu, Image, Pencil, Settings,
  FileText, BarChart, Layout, ShoppingBag, UserCog
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const stats = [
    { title: "Total Users", value: "2,856", change: "+12%", icon: Users },
    { title: "Active Products", value: "124", change: "+3", icon: Package2 },
    { title: "Revenue", value: "₹85.2L", change: "+18%", icon: TrendingUp },
    { title: "Support Tickets", value: "28", change: "-5", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-white dark:bg-gray-800 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">BIDUA Admin</h2>
          <p className="text-sm text-muted-foreground">Management Console</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart },
            { id: "products", label: "Products", icon: ShoppingBag },
            { id: "users", label: "Users", icon: UserCog },
            { id: "content", label: "Content", icon: Layout },
            { id: "leads", label: "Leads", icon: TrendingUp },
            { id: "tickets", label: "Support", icon: MessageSquare },
            { id: "reports", label: "Reports", icon: FileText },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <Button
              key={item.id}
              variant={selectedTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                        <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full justify-start">
                    <Package2 className="mr-2 h-4 w-4" /> Add New Product
                  </Button>
                  <Button className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" /> Create Report
                  </Button>
                  <Button className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" /> Manage Users
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
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
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Division Performance</CardTitle>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const leadsByDivision = [
  { division: "Naploo", leads: 45, color: "#0088FE" },
  { division: "Beauty", leads: 30, color: "#00C49F" },
  { division: "CloudDrive", leads: 25, color: "#FFBB28" },
  { division: "OEM", leads: 35, color: "#FF8042" },
  { division: "IT", leads: 28, color: "#8884d8" }
];

const monthlyLeads = [
  { month: 'Jan', Naploo: 40, Beauty: 24, CloudDrive: 20 },
  { month: 'Feb', Naploo: 30, Beauty: 28, CloudDrive: 25 },
  { month: 'Mar', Naploo: 45, Beauty: 32, CloudDrive: 30 },
  { month: 'Apr', Naploo: 50, Beauty: 35, CloudDrive: 28 }
];
