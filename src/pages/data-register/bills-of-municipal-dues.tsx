"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, Plus, Printer, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BillEntry {
  id: string
  billNo: string
  billDate: Date
  partyName: string
  billType: string
  amount: number
  dueDate: Date
  status: "paid" | "unpaid" | "overdue"
}

export default function BillsOfMunicipalDues() {
  const [bills, setBills] = useState<BillEntry[]>([
    {
      id: "1",
      billNo: "BILL-001",
      billDate: new Date(2023, 3, 5),
      partyName: "John Doe",
      billType: "Property Tax",
      amount: 12500,
      dueDate: new Date(2023, 4, 5),
      status: "paid",
    },
    {
      id: "2",
      billNo: "BILL-002",
      billDate: new Date(2023, 3, 8),
      partyName: "Jane Smith",
      billType: "Water Charges",
      amount: 2500,
      dueDate: new Date(2023, 4, 8),
      status: "unpaid",
    },
    {
      id: "3",
      billNo: "BILL-003",
      billDate: new Date(2023, 3, 10),
      partyName: "ABC Corporation",
      billType: "Trade License",
      amount: 15000,
      dueDate: new Date(2023, 4, 10),
      status: "unpaid",
    },
    {
      id: "4",
      billNo: "BILL-004",
      billDate: new Date(2023, 2, 15),
      partyName: "XYZ Enterprises",
      billType: "Advertisement Tax",
      amount: 7500,
      dueDate: new Date(2023, 3, 15),
      status: "overdue",
    },
  ])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "unpaid":
        return <Badge variant="outline">Unpaid</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bills of Municipal Dues</CardTitle>
        <CardDescription>Record of all bills generated for municipal dues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search bills..." className="pl-8" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="property">Property Tax</SelectItem>
                <SelectItem value="water">Water Charges</SelectItem>
                <SelectItem value="trade">Trade License</SelectItem>
                <SelectItem value="advertisement">Advertisement Tax</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Bill
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill No.</TableHead>
                <TableHead>Bill Date</TableHead>
                <TableHead>Party Name</TableHead>
                <TableHead>Bill Type</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.billNo}</TableCell>
                  <TableCell>{format(bill.billDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{bill.partyName}</TableCell>
                  <TableCell>{bill.billType}</TableCell>
                  <TableCell className="text-right">{bill.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{format(bill.dueDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(bill.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Paid</Badge>
              <span className="text-sm">
                ₹
                {bills
                  .filter((b) => b.status === "paid")
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Unpaid</Badge>
              <span className="text-sm">
                ₹
                {bills
                  .filter((b) => b.status === "unpaid")
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Overdue</Badge>
              <span className="text-sm">
                ₹
                {bills
                  .filter((b) => b.status === "overdue")
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Total Bills: <span className="font-semibold">{bills.length}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Total Amount:{" "}
              <span className="font-semibold">
                ₹{bills.reduce((sum, b) => sum + b.amount, 0).toLocaleString("en-IN")}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
