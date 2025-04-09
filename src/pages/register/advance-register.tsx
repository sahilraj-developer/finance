"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Download, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Advance {
  id: string
  advanceNumber: string
  date: string
  employeeName: string
  employeeId: string
  department: string
  purpose: string
  amount: number
  approvedBy: string
  dueDate: string
  status: string
  settlementDate: string | null
  settlementAmount: number | null
  remarks: string
}

export default function AdvanceRegister() {
  const [advances, setAdvances] = useState<Advance[]>([
    {
      id: "1",
      advanceNumber: "ADV-2023-001",
      date: "2023-01-10",
      employeeName: "John Smith",
      employeeId: "EMP-1001",
      department: "Public Works",
      purpose: "Site visit to northern district road project",
      amount: 5000,
      approvedBy: "Finance Director",
      dueDate: "2023-02-10",
      status: "Settled",
      settlementDate: "2023-02-05",
      settlementAmount: 4850,
      remarks: "Returned unspent amount of $150",
    },
    {
      id: "2",
      advanceNumber: "ADV-2023-002",
      date: "2023-01-15",
      employeeName: "Sarah Johnson",
      employeeId: "EMP-1025",
      department: "Health",
      purpose: "Medical camp expenses in rural areas",
      amount: 12000,
      approvedBy: "Health Secretary",
      dueDate: "2023-02-15",
      status: "Settled",
      settlementDate: "2023-02-12",
      settlementAmount: 12000,
      remarks: "All funds utilized with proper documentation",
    },
    {
      id: "3",
      advanceNumber: "ADV-2023-003",
      date: "2023-02-01",
      employeeName: "Michael Brown",
      employeeId: "EMP-1045",
      department: "Administration",
      purpose: "Conference attendance expenses",
      amount: 3500,
      approvedBy: "Administrative Officer",
      dueDate: "2023-03-01",
      status: "Outstanding",
      settlementDate: null,
      settlementAmount: null,
      remarks: "",
    },
    {
      id: "4",
      advanceNumber: "ADV-2023-004",
      date: "2023-02-10",
      employeeName: "Emily Davis",
      employeeId: "EMP-1062",
      department: "Education",
      purpose: "School inspection tour",
      amount: 2500,
      approvedBy: "Education Director",
      dueDate: "2023-03-10",
      status: "Outstanding",
      settlementDate: null,
      settlementAmount: null,
      remarks: "",
    },
  ])

  const [newAdvance, setNewAdvance] = useState<Partial<Advance>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAdvance({
      ...newAdvance,
      [name]: name === "amount" || name === "settlementAmount" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewAdvance({
      ...newAdvance,
      [name]: value,
    })
  }

  const handleAddAdvance = () => {
    const advance = {
      id: Date.now().toString(),
      advanceNumber:
        newAdvance.advanceNumber ||
        `ADV-${new Date().getFullYear()}-${(advances.length + 1).toString().padStart(3, "0")}`,
      date: newAdvance.date || new Date().toISOString().split("T")[0],
      employeeName: newAdvance.employeeName || "",
      employeeId: newAdvance.employeeId || "",
      department: newAdvance.department || "",
      purpose: newAdvance.purpose || "",
      amount: newAdvance.amount || 0,
      approvedBy: newAdvance.approvedBy || "",
      dueDate: newAdvance.dueDate || "",
      status: newAdvance.status || "Outstanding",
      settlementDate: newAdvance.status === "Settled" ? newAdvance.settlementDate : null,
      settlementAmount: newAdvance.status === "Settled" ? newAdvance.settlementAmount : null,
      remarks: newAdvance.remarks || "",
    }

    setAdvances([...advances, advance])
    setNewAdvance({})
    setOpen(false)
  }

  // Calculate total outstanding and settled amounts
  const totalOutstanding = advances
    .filter((advance) => advance.status === "Outstanding")
    .reduce((sum, advance) => sum + advance.amount, 0)

  const totalSettled = advances
    .filter((advance) => advance.status === "Settled")
    .reduce((sum, advance) => sum + advance.amount, 0)

  // Calculate overdue advances
  const today = new Date()
  const overdueAdvances = advances.filter((advance) => {
    if (advance.status !== "Outstanding") return false
    const dueDate = new Date(advance.dueDate)
    return dueDate < today
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Advances</CardTitle>
        <CardDescription>Track and manage advances given to employees</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Outstanding Advances</div>
                <div className="text-2xl font-bold">
                  {totalOutstanding.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Settled Advances</div>
                <div className="text-2xl font-bold">
                  {totalSettled.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Overdue Advances</div>
                <div className="text-2xl font-bold flex items-center">
                  {overdueAdvances.length}
                  {overdueAdvances.length > 0 && <AlertCircle className="h-4 w-4 ml-2 text-red-500" />}
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
                  <Plus className="mr-2 h-4 w-4" /> Add New Advance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Advance</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="advanceNumber" className="text-right">
                      Advance Number
                    </Label>
                    <Input
                      id="advanceNumber"
                      name="advanceNumber"
                      value={newAdvance.advanceNumber || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newAdvance.date || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="employeeName" className="text-right">
                      Employee Name
                    </Label>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      value={newAdvance.employeeName || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="employeeId" className="text-right">
                      Employee ID
                    </Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={newAdvance.employeeId || ""}
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
                      defaultValue={newAdvance.department}
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
                    <Label htmlFor="purpose" className="text-right">
                      Purpose
                    </Label>
                    <Textarea
                      id="purpose"
                      name="purpose"
                      value={newAdvance.purpose || ""}
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
                      value={newAdvance.amount || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="approvedBy" className="text-right">
                      Approved By
                    </Label>
                    <Input
                      id="approvedBy"
                      name="approvedBy"
                      value={newAdvance.approvedBy || ""}
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
                      value={newAdvance.dueDate || ""}
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
                      defaultValue={newAdvance.status || "Outstanding"}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Outstanding">Outstanding</SelectItem>
                        <SelectItem value="Settled">Settled</SelectItem>
                        <SelectItem value="Partially Settled">Partially Settled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(newAdvance.status === "Settled" || newAdvance.status === "Partially Settled") && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="settlementDate" className="text-right">
                          Settlement Date
                        </Label>
                        <Input
                          id="settlementDate"
                          name="settlementDate"
                          type="date"
                          value={newAdvance.settlementDate || ""}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="settlementAmount" className="text-right">
                          Settlement Amount
                        </Label>
                        <Input
                          id="settlementAmount"
                          name="settlementAmount"
                          type="number"
                          value={newAdvance.settlementAmount || ""}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="remarks" className="text-right">
                      Remarks
                    </Label>
                    <Textarea
                      id="remarks"
                      name="remarks"
                      value={newAdvance.remarks || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddAdvance}>Add Advance</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Advance No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Settlement Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advances.map((advance) => (
                <TableRow key={advance.id}>
                  <TableCell>{advance.advanceNumber}</TableCell>
                  <TableCell>{advance.date}</TableCell>
                  <TableCell>
                    {advance.employeeName}
                    <div className="text-xs text-muted-foreground">{advance.employeeId}</div>
                  </TableCell>
                  <TableCell>{advance.department}</TableCell>
                  <TableCell>{advance.purpose}</TableCell>
                  <TableCell className="text-right">
                    {advance.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>
                    {advance.dueDate}
                    {advance.status === "Outstanding" && new Date(advance.dueDate) < new Date() && (
                      <div className="text-xs text-red-500 font-medium">OVERDUE</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        advance.status === "Settled"
                          ? "default"
                          : advance.status === "Outstanding"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {advance.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {advance.status === "Settled" || advance.status === "Partially Settled" ? (
                      <div>
                        <div>{advance.settlementDate}</div>
                        <div className="text-xs">
                          {advance.settlementAmount?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </div>
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
