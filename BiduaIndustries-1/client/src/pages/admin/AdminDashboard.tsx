import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/use-auth";
import {
  BarChart3,
  Users,
  Package,
  MessageSquare,
  Handshake,
  LogOut,
  Settings,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

const NAV_ITEMS = [
  { 
    label: "Dashboard", 
    icon: BarChart3, 
    href: "/admin"
  },
  { 
    label: "Users", 
    icon: Users, 
    href: "/admin/users"
  },
  { 
    label: "Products", 
    icon: Package, 
    href: "/admin/products"
  },
  { 
    label: "Contact Requests", 
    icon: MessageSquare, 
    href: "/admin/contacts"
  },
  { 
    label: "Investor Inquiries", 
    icon: Handshake, 
    href: "/admin/investors"
  },
  { 
    label: "Settings", 
    icon: Settings, 
    href: "/admin/settings"
  },
];

export default import { LeadsManagement } from "@/components/admin/LeadsManagement";
import { TicketManagement } from "@/components/admin/TicketManagement";

function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <Helmet>
        <title>BIDUA Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for BIDUA Industries" />
      </Helmet>

      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile Sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="absolute left-4 top-4 z-50 lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-0 w-64">
            <div className="p-6">
              <h2 className="text-xl font-bold">BIDUA Admin</h2>
              <p className="text-sm text-muted-foreground">
                Control panel
              </p>
            </div>
            <Separator />
            <div className="py-4">
              <nav className="space-y-1 px-2">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={cn(
                        "group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        location === item.href
                          ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
            <Separator />
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800">
          <div className="p-6 bg-white dark:bg-gray-950">
            <h2 className="text-xl font-bold">BIDUA Admin</h2>
            <p className="text-sm text-muted-foreground">
              Control panel
            </p>
          </div>
          <Separator />
          <div className="flex-1 overflow-y-auto py-4 bg-white dark:bg-gray-950">
            <nav className="space-y-1 px-2">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      location === item.href
                        ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <Separator />
          <div className="p-4 bg-white dark:bg-gray-950">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <span>Admin</span>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span>Dashboard</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Total Users"
                value="24"
                description="+2 this week"
                icon={Users}
                link="/admin/users"
              />
              <DashboardCard
                title="Products"
                value="18"
                description="+3 new products"
                icon={Package}
                link="/admin/products"
              />
              <DashboardCard
                title="Contact Requests"
                value="7"
                description="2 unread"
                icon={MessageSquare}
                link="/admin/contacts"
              />
              <DashboardCard
                title="Investor Inquiries"
                value="3"
                description="1 uncontacted"
                icon={Handshake}
                link="/admin/investors"
              />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ActivityItem
                      title="New user registered"
                      description="User 'rajesh85' created an account"
                      timestamp="2 hours ago"
                    />
                    <ActivityItem
                      title="Product updated"
                      description="Beauty Care product 'Anti-Dark Spot Serum' was updated"
                      timestamp="Yesterday"
                    />
                    <ActivityItem
                      title="New investor inquiry"
                      description="A new inquiry for Naploo pods investment"
                      timestamp="2 days ago"
                    />
                    <ActivityItem
                      title="Contact form submission"
                      description="New message from a potential customer"
                      timestamp="3 days ago"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Link href="/admin/products/new">
                      <Button className="w-full justify-start">
                        <Package className="mr-2 h-4 w-4" />
                        Add New Product
                      </Button>
                    </Link>
                    <Link href="/admin/users/new">
                      <Button className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Create User Account
                      </Button>
                    </Link>
                    <Link href="/admin/contacts">
                      <Button className="w-full justify-start" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        View Contact Requests
                      </Button>
                    </Link>
                    <Link href="/admin/investors">
                      <Button className="w-full justify-start" variant="outline">
                        <Handshake className="mr-2 h-4 w-4" />
                        View Investor Inquiries
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <LeadsManagement />
            </div>

            <div className="mt-8">
              <TicketManagement />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function DashboardCard({ title, value, description, icon: Icon, link }: { 
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
  link: string;
}) {
  return (
    <Link href={link}>
      <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function ActivityItem({ title, description, timestamp }: {
  title: string;
  description: string;
  timestamp: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
      <div className="flex-1 space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
}