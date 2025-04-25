import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  BarChart3,
  Users,
  Package,
  MessageSquare,
  Handshake,
  LogOut,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function AdminLayout({ children }: { children: ReactNode }) {
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
        {children}
      </main>
    </div>
  );
}