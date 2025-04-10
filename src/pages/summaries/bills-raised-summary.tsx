"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BillRaised {
  id: string
  billNumber: string
  date: string
  billType: string
  department: string
  issuedTo: string
  description: string
  amount: number
  dueDate: string
  status: "Paid" | "Partially Paid" | "Unpaid" | "Overdue" | "Cancelled"
  collectionAmount: number | null
}

export default function BillsRaisedSummary() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Sample data - in a real app, this would be fetched based on the selected date range
  const bills: BillRaised[] = [
    {
      id: "1",
      billNumber: "BILL-2023-001",
      date: "2023-01-15",
      billType: "Property Tax",
      department: "Revenue",
      issuedTo: "John Smith",
      description: "Annual property tax for residential property",
      amount: 2500,
      dueDate: "2023-02-15",
      status: "Paid",
      collectionAmount: 2500,
    },
    {
      id: "2",
      billNumber: "BILL-2023-002",
      date: "2023-01-20",
      billType: "Water Charges",
      department: "Utilities",
      issuedTo: "Sarah Johnson",
      description: "Quarterly water charges",
      amount: 350,
      dueDate: "2023-02-20",
      status: "Paid",
      collectionAmount: 350,
    },
    {
      id: "3",
      billNumber: "BILL-2023-003",
      date: "2023-02-05",
      billType: "Business License",
      department: "Revenue",
      issuedTo: "Downtown Cafe",
      description: "Annual business license renewal",
      amount: 1200,
      dueDate: "2023-03-05",
      status: "Partially Paid",
      collectionAmount: 600,
    },
    {
      id: "4",
      billNumber: "BILL-2023-004",
      date: "2023-02-10",
      billType: "Building Permit",
      department: "Planning",
      issuedTo: "ABC Construction",
      description: "Commercial building permit",
      amount: 5000,
      dueDate: "2023-03-10",
      status: "Unpaid",
      collectionAmount: null,
    },
    {
      id: "5",
      billNumber: "BILL-2023-005",
      date: "2023-01-05",
      billType: "Property Tax",
      department: "Revenue",
      issuedTo: "Michael Brown",
      description: "Annual property tax for commercial property",
      amount: 7500,
      dueDate: "2023-02-05",
      status: "Overdue",
      collectionAmount: null,
    },
    {
      id: "6",
      billNumber: "BILL-2023-006",
      date: "2023-03-01",
      billType: "Sanitation Fee",
      department: "Utilities",
      issuedTo: "Green Apartments",
      description: "Monthly sanitation services",
      amount: 800,
      dueDate: "2023-03-31",
      status: "Cancelled",
      collectionAmount: null,
    },
  ]

  // Filter bills based on department and status
  const filteredBills = bills.filter((bill) => {
    const departmentMatch = filterDepartment === "all" || bill.department === filterDepartment
    const statusMatch = filterStatus === "all" || bill.status === filterStatus
    return departmentMatch && statusMatch
  })

  // Calculate summary statistics
  const totalBillsRaised = filteredBills.length
  const totalBillAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0)
  const totalCollected = filteredBills.reduce((sum, bill) => sum + (bill.collectionAmount || 0), 0)
  const totalOutstanding = totalBillAmount - totalCollected

  // Get unique departments for filter
  const departments = Array.from(new Set(bills.map((bill) => bill.department)))

  // Calculate summary by department
  const departmentSummary = bills.reduce(
    (acc, bill) => {
      const dept = bill.department
      if (!acc[dept]) {
        acc[dept] = {
          count: 0,
          amount: 0,
          collected: 0,
        }
      }
      acc[dept].count += 1
      acc[dept].amount += bill.amount
      acc[dept].collected += bill.collectionAmount || 0
      return acc
    },
    {} as Record<string, { count: number; amount: number; collected: number }>,
  )

  // Calculate summary by status
  const statusSummary = bills.reduce(
    (acc, bill) => {
      const status = bill.status
      if (!acc[status]) {
        acc[status] = {
          count: 0,
          amount: 0,
        }
      }
      acc[status].count += 1
      acc[status].amount += bill.amount
      return acc
    },
    {} as Record<string, { count: number; amount: number }>,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary Statement of Bills Raised</CardTitle>
            <CardDescription>Summary of all bills raised during the selected period</CardDescription>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <DateRangePicker value={dateRange} onValueChange={setDateRange} />
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Bills Raised</div>
              <div className="text-2xl font-bold">{totalBillsRaised}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Bill Amount</div>
              <div className="text-2xl font-bold">
                {totalBillAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Collected</div>
              <div className="text-2xl font-bold text-green-600">
                {totalCollected.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Outstanding</div>
              <div className="text-2xl font-bold text-amber-600">
                {totalOutstanding.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Department:</span>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bills by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Collected</TableHead>
                    <TableHead className="text-right">Outstanding</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(departmentSummary).map(([dept, data]) => (
                    <TableRow key={dept}>
                      <TableCell>{dept}</TableCell>
                      <TableCell className="text-right">{data.count}</TableCell>
                      <TableCell className="text-right">
                        {data.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {data.collected.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(data.amount - data.collected).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bills by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(statusSummary).map(([status, data]) => (
                    <TableRow key={status}>
                      <TableCell>
                        <Badge
                          variant={
                            status === "Paid"
                              ? "default"
                              : status === "Partially Paid"
                                ? "secondary"
                                : status === "Unpaid"
                                  ? "outline"
                                  : status === "Overdue"
                                    ? "destructive"
                                    : "ghost"
                          }
                        >
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{data.count}</TableCell>
                      <TableCell className="text-right">
                        {data.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {((data.amount / totalBillAmount) * 100).toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bills Raised Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Bill Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Issued To</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Collected</TableHead>
                    <TableHead className="text-right">Outstanding</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.billNumber}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.billType}</TableCell>
                      <TableCell>{bill.department}</TableCell>
                      <TableCell>{bill.issuedTo}</TableCell>
                      <TableCell className="text-right">
                        {bill.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell>{bill.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            bill.status === "Paid"
                              ? "default"
                              : bill.status === "Partially Paid"
                                ? "secondary"
                                : bill.status === "Unpaid"
                                  ? "outline"
                                  : bill.status === "Overdue"
                                    ? "destructive"
                                    : "ghost"
                          }
                        >
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {(bill.collectionAmount || 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(bill.amount - (bill.collectionAmount || 0)).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
