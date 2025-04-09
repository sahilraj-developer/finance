"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface RefundEntry {
  id: string
  transactionNumber: string
  date: string
  type: "Refund" | "Remission" | "Write-off"
  category: string
  paidTo: string
  originalReceiptNumber: string
  originalPaymentDate: string
  amount: number
  reason: string
  approvedBy: string
  approvalDate: string
  paymentReference: string
  remarks: string
}

export default function RefundsRegister() {
  const [entries, setEntries] = useState<RefundEntry[]>([
    {
      id: "1",
      transactionNumber: "REF-2023-001",
      date: "2023-01-20",
      type: "Refund",
      category: "Property Tax",
      paidTo: "John Smith",
      originalReceiptNumber: "PT-2023-1234",
      originalPaymentDate: "2023-01-10",
      amount: 500,
      reason: "Double payment",
      approvedBy: "Finance Director",
      approvalDate: "2023-01-18",
      paymentReference: "CHK-2023-0125",
      remarks: "",
    },
    {
      id: "2",
      transactionNumber: "REM-2023-001",
      date: "2023-01-25",
      type: "Remission",
      category: "Water Charges",
      paidTo: "Sarah Johnson",
      originalReceiptNumber: "WC-2023-2345",
      originalPaymentDate: "2023-01-15",
      amount: 250,
      reason: "Billing error - incorrect meter reading",
      approvedBy: "Utility Director",
      approvalDate: "2023-01-22",
      paymentReference: "ADJ-2023-0126",
      remarks: "",
    },
    {
      id: "3",
      transactionNumber: "WO-2023-001",
      date: "2023-02-10",
      type: "Write-off",
      category: "Business License Fee",
      paidTo: "Downtown Cafe",
      originalReceiptNumber: "BL-2022-3456",
      originalPaymentDate: "2022-05-15",
      amount: 350,
      reason: "Business closed due to natural disaster",
      approvedBy: "Municipal Commissioner",
      approvalDate: "2023-02-05",
      paymentReference: "WO-2023-0127",
      remarks: "Approved by council resolution #2023-15",
    },
    {
      id: "4",
      transactionNumber: "REF-2023-002",
      date: "2023-02-15",
      type: "Refund",
      category: "Building Permit Fee",
      paidTo: "Michael Brown",
      originalReceiptNumber: "BP-2023-4567",
      originalPaymentDate: "2023-02-01",
      amount: 750,
      reason: "Permit application withdrawn",
      approvedBy: "Building Department Head",
      approvalDate: "2023-02-12",
      paymentReference: "CHK-2023-0128",
      remarks: "",
    },
  ])

  const [newEntry, setNewEntry] = useState<Partial<RefundEntry>>({})
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("all")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEntry({
      ...newEntry,
      [name]: name === "amount" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewEntry({
      ...newEntry,
      [name]: value,
    })
  }

  const handleAddEntry = () => {
    const entry = {
      id: Date.now().toString(),
      transactionNumber:
        newEntry.transactionNumber ||
        `${
          newEntry.type === "Refund" ? "REF" : newEntry.type === "Remission" ? "REM" : "WO"
        }-${new Date().getFullYear()}-${(entries.filter((e) => e.type === newEntry.type).length + 1)
          .toString()
          .padStart(3, "0")}`,
      date: newEntry.date || new Date().toISOString().split("T")[0],
      type: newEntry.type || "Refund",
      category: newEntry.category || "",
      paidTo: newEntry.paidTo || "",
      originalReceiptNumber: newEntry.originalReceiptNumber || "",
      originalPaymentDate: newEntry.originalPaymentDate || "",
      amount: newEntry.amount || 0,
      reason: newEntry.reason || "",
      approvedBy: newEntry.approvedBy || "",
      approvalDate: newEntry.approvalDate || "",
      paymentReference: newEntry.paymentReference || "",
      remarks: newEntry.remarks || "",
    }

    setEntries([...entries, entry as RefundEntry])
    setNewEntry({})
    setOpen(false)
  }

  // Filter entries based on active tab
  const filteredEntries =
    activeTab === "all"
      ? entries
      : entries.filter((entry) => {
          if (activeTab === "refunds") return entry.type === "Refund"
          if (activeTab === "remissions") return entry.type === "Remission"
          if (activeTab === "writeoffs") return entry.type === "Write-off"
          return true
        })

  // Calculate totals
  const totalRefunds = entries.filter((entry) => entry.type === "Refund").reduce((sum, entry) => sum + entry.amount, 0)

  const totalRemissions = entries
    .filter((entry) => entry.type === "Remission")
    .reduce((sum, entry) => sum + entry.amount, 0)

  const totalWriteOffs = entries
    .filter((entry) => entry.type === "Write-off")
    .reduce((sum, entry) => sum + entry.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Refunds, Remissions and Write-offs</CardTitle>
        <CardDescription>
          Track and manage refunds, remissions and write-offs processed by the government entity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Refunds</div>
                <div className="text-2xl font-bold">
                  {totalRefunds.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Remissions</div>
                <div className="text-2xl font-bold">
                  {totalRemissions.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Write-offs</div>
                <div className="text-2xl font-bold">
                  {totalWriteOffs.toLocaleString("en-US", { style: "currency", currency: "USD" })}
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
                  <Plus className="mr-2 h-4 w-4" /> Add New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("type", value)} defaultValue={newEntry.type}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Refund">Refund</SelectItem>
                        <SelectItem value="Remission">Remission</SelectItem>
                        <SelectItem value="Write-off">Write-off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="transactionNumber" className="text-right">
                      Transaction Number
                    </Label>
                    <Input
                      id="transactionNumber"
                      name="transactionNumber"
                      value={newEntry.transactionNumber || ""}
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
                      value={newEntry.date || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("category", value)}
                      defaultValue={newEntry.category}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Property Tax">Property Tax</SelectItem>
                        <SelectItem value="Water Charges">Water Charges</SelectItem>
                        <SelectItem value="Business License Fee">Business License Fee</SelectItem>
                        <SelectItem value="Building Permit Fee">Building Permit Fee</SelectItem>
                        <SelectItem value="Other Fees">Other Fees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paidTo" className="text-right">
                      Paid To
                    </Label>
                    <Input
                      id="paidTo"
                      name="paidTo"
                      value={newEntry.paidTo || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="originalReceiptNumber" className="text-right">
                      Original Receipt No.
                    </Label>
                    <Input
                      id="originalReceiptNumber"
                      name="originalReceiptNumber"
                      value={newEntry.originalReceiptNumber || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="originalPaymentDate" className="text-right">
                      Original Payment Date
                    </Label>
                    <Input
                      id="originalPaymentDate"
                      name="originalPaymentDate"
                      type="date"
                      value={newEntry.originalPaymentDate || ""}
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
                      value={newEntry.amount || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reason" className="text-right">
                      Reason
                    </Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={newEntry.reason || ""}
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
                      value={newEntry.approvedBy || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="approvalDate" className="text-right">
                      Approval Date
                    </Label>
                    <Input
                      id="approvalDate"
                      name="approvalDate"
                      type="date"
                      value={newEntry.approvalDate || ""}
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
                      value={newEntry.paymentReference || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="remarks" className="text-right">
                      Remarks
                    </Label>
                    <Textarea
                      id="remarks"
                      name="remarks"
                      value={newEntry.remarks || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddEntry}>Add Entry</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Entries</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
            <TabsTrigger value="remissions">Remissions</TabsTrigger>
            <TabsTrigger value="writeoffs">Write-offs</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Paid To</TableHead>
                <TableHead>Original Receipt</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Payment Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.transactionNumber}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        entry.type === "Refund"
                          ? "bg-blue-100 text-blue-800"
                          : entry.type === "Remission"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {entry.type}
                    </span>
                  </TableCell>
                  <TableCell>{entry.category}</TableCell>
                  <TableCell>{entry.paidTo}</TableCell>
                  <TableCell>
                    {entry.originalReceiptNumber}
                    <div className="text-xs text-muted-foreground">{entry.originalPaymentDate}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    {entry.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{entry.reason}</TableCell>
                  <TableCell>
                    {entry.approvedBy}
                    <div className="text-xs text-muted-foreground">{entry.approvalDate}</div>
                  </TableCell>
                  <TableCell>{entry.paymentReference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
