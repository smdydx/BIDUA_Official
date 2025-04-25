import { motion } from "framer-motion";
import { LeadsManagement } from "@/components/admin/LeadsManagement";
import { TicketManagement } from "@/components/admin/TicketManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, TrendingUp, Bell } from "lucide-react";

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