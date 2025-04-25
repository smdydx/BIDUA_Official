
import { motion } from "framer-motion";
import { LeadsManagement } from "@/components/admin/LeadsManagement";
import { TicketManagement } from "@/components/admin/TicketManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, TrendingUp, Bell, ChartPieIcon } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const leadData = [
  { month: 'Jan', Naploo: 40, Beauty: 24, CloudDrive: 20, OEM: 27, IT: 18 },
  { month: 'Feb', Naploo: 30, Beauty: 28, CloudDrive: 25, OEM: 25, IT: 22 },
  { month: 'Mar', Naploo: 45, Beauty: 32, CloudDrive: 30, OEM: 31, IT: 28 },
  { month: 'Apr', Naploo: 50, Beauty: 35, CloudDrive: 28, OEM: 28, IT: 25 },
];

const ticketStatusData = [
  { name: 'Open', value: 30 },
  { name: 'In Progress', value: 45 },
  { name: 'Resolved', value: 85 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Leads", value: "256", icon: Users, color: "bg-blue-500" },
          { title: "Open Tickets", value: "42", icon: MessageSquare, color: "bg-green-500" },
          { title: "Conversion Rate", value: "12.5%", icon: TrendingUp, color: "bg-purple-500" },
          { title: "Pending Actions", value: "8", icon: Bell, color: "bg-orange-500" }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="flex items-center p-6">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Division-wise Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <BarChart data={leadData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Bar dataKey="Naploo" fill="#8884d8" />
                <Bar dataKey="Beauty" fill="#82ca9d" />
                <Bar dataKey="CloudDrive" fill="#ffc658" />
                <Bar dataKey="OEM" fill="#ff7300" />
                <Bar dataKey="IT" fill="#0088FE" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            <LeadsManagement />
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <TicketManagement />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
