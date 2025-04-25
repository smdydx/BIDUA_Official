
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, MessageSquare, TrendingUp, Package2, Cloud, Building2,
  Sparkles, Cpu, FileText, BarChart3, Settings, Mail,
  CheckCircle, Clock, XCircle, Filter, Download
} from "lucide-react";
import { 
  Card, CardContent, CardHeader, CardTitle,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Button, Badge,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [ticketFilter, setTicketFilter] = useState("all");

  const divisions = [
    { id: "naploo", name: "Naploo", icon: Building2, leads: 45 },
    { id: "beauty", name: "Beauty Care", icon: Sparkles, leads: 30 },
    { id: "cloud", name: "CloudDrive", icon: Cloud, leads: 25 },
    { id: "oem", name: "OEM Solutions", icon: Package2, leads: 35 },
    { id: "it", name: "IT Connect", icon: Cpu, leads: 28 }
  ];

  const tickets = [
    {
      id: "TKT001",
      subject: "Naploo Investment Query",
      status: "open",
      priority: "high",
      division: "naploo",
      assignedTo: "Sales Team",
      createdAt: "2024-01-20"
    },
    // Add more mock tickets as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <StatsCard 
          title="Total Leads" 
          value="163"
          icon={TrendingUp}
          change="+12% from last month"
        />
        <StatsCard 
          title="Open Tickets" 
          value="28"
          icon={MessageSquare}
          change="5 high priority"
        />
        <StatsCard 
          title="Active Users" 
          value="2,856"
          icon={Users}
          change="+18% this week"
        />
        <StatsCard 
          title="Conversion Rate" 
          value="24.8%"
          icon={BarChart3}
          change="+2.3% from last month"
        />
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads Management</TabsTrigger>
            <TabsTrigger value="tickets">Ticket System</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Division Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Division Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={divisions}
                          dataKey="leads"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          label
                        >
                          {divisions.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { text: "New Naploo investment inquiry", time: "5 minutes ago" },
                      { text: "Beauty Care distributor application", time: "23 minutes ago" },
                      { text: "CloudDrive pre-booking", time: "1 hour ago" },
                      { text: "OEM partnership request", time: "2 hours ago" }
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          <span>{activity.text}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Leads Management</CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Divisions</SelectItem>
                      {divisions.map(div => (
                        <SelectItem key={div.id} value={div.id}>{div.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Division</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Assigned To</th>
                        <th className="p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add mock leads data here */}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Ticket System</CardTitle>
                <div className="flex gap-2">
                  <Select value={ticketFilter} onValueChange={setTicketFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left">Ticket ID</th>
                        <th className="p-2 text-left">Subject</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Priority</th>
                        <th className="p-2 text-left">Division</th>
                        <th className="p-2 text-left">Assigned To</th>
                        <th className="p-2 text-left">Created At</th>
                        <th className="p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(ticket => (
                        <tr key={ticket.id} className="border-b">
                          <td className="p-2">{ticket.id}</td>
                          <td className="p-2">{ticket.subject}</td>
                          <td className="p-2">
                            <Badge variant={
                              ticket.status === "open" ? "default" :
                              ticket.status === "progress" ? "secondary" : "success"
                            }>
                              {ticket.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Badge variant={ticket.priority === "high" ? "destructive" : "outline"}>
                              {ticket.priority}
                            </Badge>
                          </td>
                          <td className="p-2">{ticket.division}</td>
                          <td className="p-2">{ticket.assignedTo}</td>
                          <td className="p-2">{ticket.createdAt}</td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { source: "Website", count: 45 },
                        { source: "Social Media", count: 35 },
                        { source: "Referral", count: 20 },
                        { source: "Direct", count: 15 }
                      ]}>
                        <XAxis dataKey="source" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { status: "Converted", value: 35 },
                            { status: "In Progress", value: 45 },
                            { status: "Lost", value: 20 }
                          ]}
                          dataKey="value"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          <Cell fill="#4CAF50" />
                          <Cell fill="#2196F3" />
                          <Cell fill="#F44336" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, change }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            <p className="text-sm mt-2 text-muted-foreground">{change}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
