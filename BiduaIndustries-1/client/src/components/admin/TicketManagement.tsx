
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MOCK_TICKETS = [
  {
    id: "TKT001",
    subject: "CloudDrive Pre-order Query",
    customer: "Amit Shah",
    status: "Open",
    priority: "High",
    assignedTeam: "Sales",
    lastUpdate: "2024-01-20"
  },
  {
    id: "TKT002",
    subject: "Beauty Product Delivery Issue",
    customer: "Priya Sharma",
    status: "In Progress",
    priority: "Medium",
    assignedTeam: "Support",
    lastUpdate: "2024-01-19"
  },
  {
    id: "TKT003",
    subject: "Naploo Pod Booking Confirmation",
    customer: "Rahul Verma",
    status: "Resolved",
    priority: "Low",
    assignedTeam: "Sales",
    lastUpdate: "2024-01-18"
  },
  {
    id: "TKT004",
    subject: "IT Connect Service Request",
    customer: "Sneha Das",
    status: "Open",
    priority: "High",
    assignedTeam: "Technical",
    lastUpdate: "2024-01-17"
  },
  {
    id: "TKT005",
    subject: "OEM Partnership Discussion",
    customer: "Vikram Singh",
    status: "In Progress",
    priority: "Medium",
    assignedTeam: "Business",
    lastUpdate: "2024-01-16"
  }
];

export function TicketManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tickets</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TICKETS.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.customer}</TableCell>
                <TableCell>
                  <Badge>{ticket.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="destructive">{ticket.priority}</Badge>
                </TableCell>
                <TableCell>{ticket.assignedTeam}</TableCell>
                <TableCell>{ticket.lastUpdate}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
