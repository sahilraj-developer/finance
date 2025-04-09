"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Download, FileCheck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Bill {
  id: string
  billNumber: string
  date: string
  vendor: string
  description: string
  amount: number
  dueDate: string
  department: string
  budgetHead: string
  status: string
  paymentDate: string | null;
  paymentReference?: string | null;
}

export default function BillsForPaymentRegister() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      billNumber: "BILL-2023-001",
      date: "2023-01-15",
      vendor: "City Electric Supply Co.",
      description: "Electricity charges for municipal buildings",
      amount: 12500,
      dueDate: "2023-02-15",
      department: "Administration",
      budgetHead: "Utilities",
      status: "Paid",
      paymentDate: "2023-02-10",
      paymentReference: "PV-2023-0125",
    },
    {
      id: "2",
      billNumber: "BILL-2023-002",
      date: "2023-01-22",
      vendor: "Metro Water Corporation",
      description: "Water supply charges for Q1 2023",
      amount: 8750,
      dueDate: "2023-02-22",
      department: "Administration",
      budgetHead: "Utilities",
      status: "Paid",
      paymentDate: "2023-02-15",
      paymentReference: "PV-2023-0126",
    },
    {
      id: "3",
      billNumber: "BILL-2023-003",
      date: "2023-02-05",
      vendor: "Office Supplies Inc.",
      description: "Stationery and office supplies",
      amount: 3500,
      dueDate: "2023-03-05",
      department: "Administration",
      budgetHead: "Office Expenses",
      status: "Pending",
      paymentDate: null,
      paymentReference: null,
    },
    {
      id: "4",
      billNumber: "BILL-2023-004",
      date: "2023-02-10",
      vendor: "City Maintenance Services",
      description: "Monthly maintenance of municipal buildings",
      amount: 15000,
      dueDate: "2023-03-10",
      department: "Public Works",
      budgetHead: "Maintenance",
      status: "Pending",
      paymentDate: null,
      paymentReference: null,
    },
  ])

  const [newBill, setNewBill] = useState<Partial<Bill>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBill({
      ...newBill,
      [name]: name === "amount" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewBill({
      ...newBill,
      [name]: value,
    })
  }

  const handleAddBill = () => {
    const bill = {
      id: Date.now().toString(),
      billNumber:
        newBill.billNumber || `BILL-${new Date().getFullYear()}-${(bills.length + 1).toString().padStart(3, "0")}`,
      date: newBill.date || new Date().toISOString().split("T")[0],
      vendor: newBill.vendor || "",
      description: newBill.description || "",
      amount: newBill.amount || 0,
      dueDate: newBill.dueDate || "",
      department: newBill.department || "",
      budgetHead: newBill.budgetHead || "",
      status: newBill.status || "Pending",
      paymentDate: newBill.status === "Paid" ? newBill.paymentDate || new Date().toISOString().split("T")[0] : null,
      paymentReference: newBill.status === "Paid" ? newBill.paymentReference : null,
    }

    setBills([...bills, bill])
    setNewBill({})
    setOpen(false)
  }

  // Calculate total pending and paid amounts
  const totalPending = bills.filter((bill) => bill.status === "Pending").reduce((sum, bill) => sum + bill.amount, 0)

  const totalPaid = bills.filter((bill) => bill.status === "Paid").reduce((sum, bill) => sum + bill.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Bills for Payment</CardTitle>
        <CardDescription>Track and manage bills pending payment and payment history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Pending Payment</div>
                <div className="text-2xl font-bold">
                  {totalPending.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Paid</div>
                <div className="text-2xl font-bold">
                  {totalPaid.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Register
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add New Bill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Bill for Payment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="billNumber" className="text-right">
                      Bill Number
                    </Label>
                    <Input
                      id="billNumber"
                      name="billNumber"
                      value={newBill.billNumber || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Bill Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newBill.date || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vendor" className="text-right">
                      Vendor
                    </Label>
                    <Input
                      id="vendor"
                      name="vendor"
                      value={newBill.vendor || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={newBill.description || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={newBill.amount || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={newBill.dueDate || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("department", value)}
                      defaultValue={newBill.department}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="Public Works">Public Works</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budgetHead" className="text-right">
                      Budget Head
                    </Label>
                    <Input
                      id="budgetHead"
                      name="budgetHead"
                      value={newBill.budgetHead || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("status", value)}
                      defaultValue={newBill.status || "Pending"}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newBill.status === "Paid" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paymentDate" className="text-right">
                          Payment Date
                        </Label>
                        <Input
                          id="paymentDate"
                          name="paymentDate"
                          type="date"
                          value={newBill.paymentDate || ""}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="paymentReference" className="text-right">
                          Payment Reference
                        </Label>
                        <Input
                          id="paymentReference"
                          name="paymentReference"
                          value={newBill.paymentReference || ""}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddBill}>Add Bill</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Budget Head</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.billNumber}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.vendor}</TableCell>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell className="text-right">
                    {bill.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>{bill.department}</TableCell>
                  <TableCell>{bill.budgetHead}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        bill.status === "Paid"
                          ? "default"
                          : bill.status === "Pending"
                            ? "outline"
                            : bill.status === "Approved"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {bill.status === "Paid" ? (
                      <div className="flex items-center">
                        <FileCheck className="h-4 w-4 mr-1 text-green-500" />
                        <span>
                          {bill.paymentDate} <br />
                          <span className="text-xs text-muted-foreground">{bill.paymentReference}</span>
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
