
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Package, Cloud, Code } from "lucide-react";

const MOCK_LEADS = [
  {
    id: "LEAD001",
    name: "Rajesh Kumar",
    division: "Naploo",
    type: "Investment",
    status: "New",
    date: "2024-01-20",
    assignedTo: "Sales Team"
  },
  {
    id: "LEAD002",
    name: "Priya Singh",
    division: "Beauty Care",
    type: "Distributor",
    status: "In Progress",
    date: "2024-01-19",
    assignedTo: "Product Team"
  },
  {
    id: "LEAD003",
    name: "Amit Patel",
    division: "CloudDrive",
    type: "Pre-Order",
    status: "Contacted",
    date: "2024-01-18",
    assignedTo: "Tech Team"
  },
  {
    id: "LEAD004",
    name: "Sneha Reddy",
    division: "OEM",
    type: "Partnership",
    status: "New",
    date: "2024-01-17",
    assignedTo: "Business Team"
  },
  {
    id: "LEAD005",
    name: "Mohammed Khan",
    division: "IT Connect",
    type: "Service",
    status: "In Progress",
    date: "2024-01-16",
    assignedTo: "Sales Team"
  }
];

export function LeadsManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="naploo">Naploo</TabsTrigger>
            <TabsTrigger value="beauty">Beauty Care</TabsTrigger>
            <TabsTrigger value="cloud">CloudDrive</TabsTrigger>
            <TabsTrigger value="oem">OEM</TabsTrigger>
            <TabsTrigger value="it">IT Connect</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_LEADS.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.id}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.division}</TableCell>
                    <TableCell>{lead.type}</TableCell>
                    <TableCell>
                      <Badge variant={lead.status === "New" ? "default" : "secondary"}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.date}</TableCell>
                    <TableCell>{lead.assignedTo}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
