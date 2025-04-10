"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Liability {
  id: string
  voucherNumber: string
  date: string
  dueDate: string
  vendor: string
  description: string
  department: string
  budgetHead: string
  amount: number
  status: "Pending" | "Approved" | "Overdue" | "Disputed"
  priority: "High" | "Medium" | "Low"
  paymentSource: string
}

export default function OutstandingLiabilitySummary() {
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Sample data - in a real app, this would be fetched from the database
  const liabilities: Liability[] = [
    {
      id: "1",
      voucherNumber: "LB-2023-001",
      date: "2023-01-15",
      dueDate: "2023-02-15",
      vendor: "City Electric Supply Co.",
      description: "Electricity charges for municipal buildings",
      department: "Administration",
      budgetHead: "Utilities",
      amount: 12500,
      status: "Pending",
      priority: "High",
      paymentSource: "General Fund",
    },
    {
      id: "2",
      voucherNumber: "LB-2023-002",
      date: "2023-01-22",
      dueDate: "2023-02-22",
      vendor: "Metro Water Corporation",
      description: "Water supply charges for Q1 2023",
      department: "Administration",
      budgetHead: "Utilities",
      amount: 8750,
      status: "Approved",
      priority: "High",
      paymentSource: "General Fund",
    },
    {
      id: "3",
      voucherNumber: "LB-2023-003",
      date: "2023-02-05",
      dueDate: "2023-03-05",
      vendor: "Office Supplies Inc.",
      description: "Stationery and office supplies",
      department: "Administration",
      budgetHead: "Office Expenses",
      amount: 3500,
      status: "Pending",
      priority: "Medium",
      paymentSource: "General Fund",
    },
    {
      id: "4",
      voucherNumber: "LB-2023-004",
      date: "2023-02-10",
      dueDate: "2023-03-10",
      vendor: "City Maintenance Services",
      description: "Monthly maintenance of municipal buildings",
      department: "Public Works",
      budgetHead: "Maintenance",
      amount: 15000,
      status: "Pending",
      priority: "Medium",
      paymentSource: "General Fund",
    },
    {
      id: "5",
      voucherNumber: "LB-2023-005",
      date: "2023-01-05",
      dueDate: "2023-02-05",
      vendor: "ABC Construction",
      description: "Road repair project - Phase 1",
      department: "Public Works",
      budgetHead: "Infrastructure",
      amount: 75000,
      status: "Overdue",
      priority: "High",
      paymentSource: "Capital Projects Fund",
    },
    {
      id: "6",
      voucherNumber: "LB-2023-006",
      date: "2023-03-01",
      dueDate: "2023-04-01",
      vendor: "IT Solutions Inc.",
      description: "Annual software licenses renewal",
      department: "IT",
      budgetHead: "Software",
      amount: 22000,
      status: "Disputed",
      priority: "Medium",
      paymentSource: "General Fund",
    },
  ]

  // Filter liabilities based on department and status
  const filteredLiabilities = liabilities.filter((liability) => {
    const departmentMatch = filterDepartment === "all" || liability.department === filterDepartment
    const statusMatch = filterStatus === "all" || liability.status === filterStatus
    return departmentMatch && statusMatch
  })

  // Calculate summary statistics
  const totalLiabilities = filteredLiabilities.length
  const totalAmount = filteredLiabilities.reduce((sum, liability) => sum + liability.amount, 0)
  const overdueAmount = filteredLiabilities
    .filter((liability) => liability.status === "Overdue")
    .reduce((sum, liability) => sum + liability.amount, 0)
  const pendingAmount = filteredLiabilities
    .filter((liability) => liability.status === "Pending" || liability.status === "Approved")
    .reduce((sum, liability) => sum + liability.amount, 0)

  // Get unique departments for filter
  const departments = Array.from(new Set(liabilities.map((liability) => liability.department)))

  // Calculate summary by department
  const departmentSummary = liabilities.reduce(
    (acc, liability) => {
      const dept = liability.department
      if (!acc[dept]) {
        acc[dept] = {
          count: 0,
          amount: 0,
        }
      }
      acc[dept].count += 1
      acc[dept].amount += liability.amount
      return acc
    },
    {} as Record<string, { count: number; amount: number }>,
  )

  // Calculate summary by status
  const statusSummary = liabilities.reduce(
    (acc, liability) => {
      const status = liability.status
      if (!acc[status]) {
        acc[status] = {
          count: 0,
          amount: 0,
        }
      }
      acc[status].count += 1
      acc[status].amount += liability.amount
      return acc
    },
    {} as Record<string, { count: number; amount: number }>,
  )

  // Calculate summary by priority
  const prioritySummary = liabilities.reduce(
    (acc, liability) => {
      const priority = liability.priority
      if (!acc[priority]) {
        acc[priority] = {
          count: 0,
          amount: 0,
        }
      }
      acc[priority].count += 1
      acc[priority].amount += liability.amount
      return acc
    },
    {} as Record<string, { count: number; amount: number }>,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary of Outstanding Liability for Expenses</CardTitle>
            <CardDescription>Summary of all pending and approved expenses awaiting payment</CardDescription>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Outstanding</div>
              <div className="text-2xl font-bold">
                {totalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Pending/Approved</div>
              <div className="text-2xl font-bold">
                {pendingAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Overdue</div>
              <div className="text-2xl font-bold text-red-600">
                {overdueAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
              {overdueAmount > 0 && <AlertCircle className="h-4 w-4 text-red-600 mt-1" />}
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By Department</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(statusSummary).map(([status, data]) => (
                    <TableRow key={status}>
                      <TableCell>
                        <Badge
                          variant={
                            status === "Approved"
                              ? "default"
                              : status === "Pending"
                                ? "outline"
                                : status === "Overdue"
                                  ? "destructive"
                                  : "secondary"
                          }
                        >
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{data.count}</TableCell>
                      <TableCell className="text-right">
                        {data.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(prioritySummary).map(([priority, data]) => (
                    <TableRow key={priority}>
                      <TableCell>
                        <Badge
                          variant={
                            priority === "High" ? "destructive" : priority === "Medium" ? "default" : "secondary"
                          }
                        >
                          {priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{data.count}</TableCell>
                      <TableCell className="text-right">
                        {data.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
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
            <CardTitle className="text-lg">Outstanding Liability Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voucher No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLiabilities.map((liability) => (
                    <TableRow key={liability.id}>
                      <TableCell>{liability.voucherNumber}</TableCell>
                      <TableCell>{liability.date}</TableCell>
                      <TableCell>{liability.dueDate}</TableCell>
                      <TableCell>{liability.vendor}</TableCell>
                      <TableCell>{liability.description}</TableCell>
                      <TableCell>{liability.department}</TableCell>
                      <TableCell className="text-right">
                        {liability.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            liability.status === "Approved"
                              ? "default"
                              : liability.status === "Pending"
                                ? "outline"
                                : liability.status === "Overdue"
                                  ? "destructive"
                                  : "secondary"
                          }
                        >
                          {liability.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            liability.priority === "High"
                              ? "destructive"
                              : liability.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {liability.priority}
                        </Badge>
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
