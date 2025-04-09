"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface PermanentAdvance {
  id: string
  advanceNumber: string
  holderName: string
  holderDesignation: string
  department: string
  purpose: string
  sanctionDate: string
  sanctionedBy: string
  amount: number
  lastReviewDate: string
  nextReviewDate: string
  status: string
}

export default function PermanentAdvanceRegister() {
  const [advances, setAdvances] = useState<PermanentAdvance[]>([
    {
      id: "1",
      advanceNumber: "PA-2023-001",
      holderName: "Robert Wilson",
      holderDesignation: "Public Works Director",
      department: "Public Works",
      purpose: "Emergency road repairs and maintenance",
      sanctionDate: "2023-01-01",
      sanctionedBy: "Municipal Commissioner",
      amount: 25000,
      lastReviewDate: "2023-06-30",
      nextReviewDate: "2023-12-31",
      status: "Active",
    },
    {
      id: "2",
      advanceNumber: "PA-2023-002",
      holderName: "Jennifer Adams",
      holderDesignation: "Health Officer",
      department: "Health",
      purpose: "Emergency medical supplies and services",
      sanctionDate: "2023-01-01",
      sanctionedBy: "Municipal Commissioner",
      amount: 15000,
      lastReviewDate: "2023-06-30",
      nextReviewDate: "2023-12-31",
      status: "Active",
    },
    {
      id: "3",
      advanceNumber: "PA-2023-003",
      holderName: "Thomas Clark",
      holderDesignation: "Administrative Officer",
      department: "Administration",
      purpose: "Office petty cash and emergency expenses",
      sanctionDate: "2023-01-01",
      sanctionedBy: "Municipal Commissioner",
      amount: 5000,
      lastReviewDate: "2023-06-30",
      nextReviewDate: "2023-12-31",
      status: "Active",
    },
    {
      id: "4",
      advanceNumber: "PA-2022-004",
      holderName: "Patricia Moore",
      holderDesignation: "Former Education Director",
      department: "Education",
      purpose: "School emergency funds",
      sanctionDate: "2022-01-01",
      sanctionedBy: "Previous Municipal Commissioner",
      amount: 10000,
      lastReviewDate: "2022-12-31",
      nextReviewDate: "2023-06-30",
      status: "Surrendered",
    },
  ])

  const [newAdvance, setNewAdvance] = useState<Partial<PermanentAdvance>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAdvance({
      ...newAdvance,
      [name]: name === "amount" ? Number.parseFloat(value) : value,
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
        `PA-${new Date().getFullYear()}-${(advances.length + 1).toString().padStart(3, "0")}`,
      holderName: newAdvance.holderName || "",
      holderDesignation: newAdvance.holderDesignation || "",
      department: newAdvance.department || "",
      purpose: newAdvance.purpose || "",
      sanctionDate: newAdvance.sanctionDate || new Date().toISOString().split("T")[0],
      sanctionedBy: newAdvance.sanctionedBy || "",
      amount: newAdvance.amount || 0,
      lastReviewDate: newAdvance.lastReviewDate || new Date().toISOString().split("T")[0],
      nextReviewDate: newAdvance.nextReviewDate || "",
      status: newAdvance.status || "Active",
    }

    setAdvances([...advances, advance])
    setNewAdvance({})
    setOpen(false)
  }

  // Calculate total active permanent advances
  const totalActive = advances
    .filter((advance) => advance.status === "Active")
    .reduce((sum, advance) => sum + advance.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Permanent Advances</CardTitle>
        <CardDescription>Track and manage permanent/imprest advances given to department heads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Active Advances</div>
                <div className="text-2xl font-bold">
                  {totalActive.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Active Advances</div>
                <div className="text-2xl font-bold">
                  {advances.filter((advance) => advance.status === "Active").length}
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
                  <Plus className="mr-2 h-4 w-4" /> Add New Permanent Advance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Permanent Advance</DialogTitle>
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
                    <Label htmlFor="holderName" className="text-right">
                      Holder Name
                    </Label>
                    <Input
                      id="holderName"
                      name="holderName"
                      value={newAdvance.holderName || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="holderDesignation" className="text-right">
                      Holder Designation
                    </Label>
                    <Input
                      id="holderDesignation"
                      name="holderDesignation"
                      value={newAdvance.holderDesignation || ""}
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
                    <Label htmlFor="sanctionDate" className="text-right">
                      Sanction Date
                    </Label>
                    <Input
                      id="sanctionDate"
                      name="sanctionDate"
                      type="date"
                      value={newAdvance.sanctionDate || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sanctionedBy" className="text-right">
                      Sanctioned By
                    </Label>
                    <Input
                      id="sanctionedBy"
                      name="sanctionedBy"
                      value={newAdvance.sanctionedBy || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastReviewDate" className="text-right">
                      Last Review Date
                    </Label>
                    <Input
                      id="lastReviewDate"
                      name="lastReviewDate"
                      type="date"
                      value={newAdvance.lastReviewDate || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nextReviewDate" className="text-right">
                      Next Review Date
                    </Label>
                    <Input
                      id="nextReviewDate"
                      name="nextReviewDate"
                      type="date"
                      value={newAdvance.nextReviewDate || ""}
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
                      defaultValue={newAdvance.status || "Active"}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Surrendered">Surrendered</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddAdvance}>Add Permanent Advance</Button>
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
                <TableHead>Holder</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Sanction Date</TableHead>
                <TableHead>Last Review</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advances.map((advance) => (
                <TableRow key={advance.id}>
                  <TableCell>{advance.advanceNumber}</TableCell>
                  <TableCell>
                    {advance.holderName}
                    <div className="text-xs text-muted-foreground">{advance.holderDesignation}</div>
                  </TableCell>
                  <TableCell>{advance.department}</TableCell>
                  <TableCell>{advance.purpose}</TableCell>
                  <TableCell className="text-right">
                    {advance.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{advance.sanctionDate}</TableCell>
                  <TableCell>{advance.lastReviewDate}</TableCell>
                  <TableCell>
                    {advance.nextReviewDate}
                    {advance.status === "Active" && new Date(advance.nextReviewDate) < new Date() && (
                      <div className="flex items-center text-xs text-amber-500 font-medium">
                        <RefreshCw className="h-3 w-3 mr-1" /> REVIEW DUE
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        advance.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : advance.status === "Surrendered"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {advance.status}
                    </span>
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
