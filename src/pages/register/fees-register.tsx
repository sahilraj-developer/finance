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

interface FeeEntry {
  id: string
  receiptNumber: string
  date: string
  feeType: "Notice Fee" | "Warrant Fee" | "Other Fee"
  description: string
  paidBy: string
  referenceNumber: string
  amount: number
  collectedBy: string
  paymentMode: string
  remarks: string
}

export default function FeesRegister() {
  const [fees, setFees] = useState<FeeEntry[]>([
    {
      id: "1",
      receiptNumber: "NF-2023-001",
      date: "2023-01-15",
      feeType: "Notice Fee",
      description: "Property tax notice fee",
      paidBy: "John Smith",
      referenceNumber: "PT-2023-1234",
      amount: 50,
      collectedBy: "Tax Clerk",
      paymentMode: "Cash",
      remarks: "",
    },
    {
      id: "2",
      receiptNumber: "WF-2023-001",
      date: "2023-01-22",
      feeType: "Warrant Fee",
      description: "Property tax warrant fee",
      paidBy: "Sarah Johnson",
      referenceNumber: "PT-2023-2345",
      amount: 100,
      collectedBy: "Tax Clerk",
      paymentMode: "Check",
      remarks: "Check #12345",
    },
    {
      id: "3",
      receiptNumber: "OF-2023-001",
      date: "2023-02-05",
      feeType: "Other Fee",
      description: "Building permit application fee",
      paidBy: "Michael Brown",
      referenceNumber: "BP-2023-0123",
      amount: 250,
      collectedBy: "Building Department Clerk",
      paymentMode: "Credit Card",
      remarks: "",
    },
    {
      id: "4",
      receiptNumber: "NF-2023-002",
      date: "2023-02-10",
      feeType: "Notice Fee",
      description: "Water bill notice fee",
      paidBy: "Emily Davis",
      referenceNumber: "WB-2023-3456",
      amount: 25,
      collectedBy: "Utility Clerk",
      paymentMode: "Cash",
      remarks: "",
    },
    {
      id: "5",
      receiptNumber: "OF-2023-002",
      date: "2023-02-15",
      feeType: "Other Fee",
      description: "Document certification fee",
      paidBy: "Robert Wilson",
      referenceNumber: "DC-2023-0234",
      amount: 75,
      collectedBy: "Administrative Clerk",
      paymentMode: "Online",
      remarks: "Transaction ID: 987654321",
    },
  ])

  const [newFee, setNewFee] = useState<Partial<FeeEntry>>({})
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("all")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewFee({
      ...newFee,
      [name]: name === "amount" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewFee({
      ...newFee,
      [name]: value,
    })
  }

  const handleAddFee = () => {
    const fee = {
      id: Date.now().toString(),
      receiptNumber:
        newFee.receiptNumber ||
        `${
          newFee.feeType === "Notice Fee" ? "NF" : newFee.feeType === "Warrant Fee" ? "WF" : "OF"
        }-${new Date().getFullYear()}-${(fees.filter((f) => f.feeType === newFee.feeType).length + 1)
          .toString()
          .padStart(3, "0")}`,
      date: newFee.date || new Date().toISOString().split("T")[0],
      feeType: newFee.feeType || "Other Fee",
      description: newFee.description || "",
      paidBy: newFee.paidBy || "",
      referenceNumber: newFee.referenceNumber || "",
      amount: newFee.amount || 0,
      collectedBy: newFee.collectedBy || "",
      paymentMode: newFee.paymentMode || "",
      remarks: newFee.remarks || "",
    }

    setFees([...fees, fee as FeeEntry])
    setNewFee({})
    setOpen(false)
  }

  // Filter fees based on active tab
  const filteredFees =
    activeTab === "all"
      ? fees
      : fees.filter((fee) => {
          if (activeTab === "notice") return fee.feeType === "Notice Fee"
          if (activeTab === "warrant") return fee.feeType === "Warrant Fee"
          if (activeTab === "other") return fee.feeType === "Other Fee"
          return true
        })

  // Calculate totals
  const totalNoticeFees = fees.filter((fee) => fee.feeType === "Notice Fee").reduce((sum, fee) => sum + fee.amount, 0)

  const totalWarrantFees = fees.filter((fee) => fee.feeType === "Warrant Fee").reduce((sum, fee) => sum + fee.amount, 0)

  const totalOtherFees = fees.filter((fee) => fee.feeType === "Other Fee").reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register of Notice Fee, Warrant Fee & Other Fees</CardTitle>
        <CardDescription>Track and manage various fees collected by the government entity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Notice Fees</div>
                <div className="text-2xl font-bold">
                  {totalNoticeFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Warrant Fees</div>
                <div className="text-2xl font-bold">
                  {totalWarrantFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full md:w-64">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Other Fees</div>
                <div className="text-2xl font-bold">
                  {totalOtherFees.toLocaleString("en-US", { style: "currency", currency: "USD" })}
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
                  <Plus className="mr-2 h-4 w-4" /> Add New Fee
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Fee Entry</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="feeType" className="text-right">
                      Fee Type
                    </Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("feeType", value)}
                      defaultValue={newFee.feeType}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select fee type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Notice Fee">Notice Fee</SelectItem>
                        <SelectItem value="Warrant Fee">Warrant Fee</SelectItem>
                        <SelectItem value="Other Fee">Other Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="receiptNumber" className="text-right">
                      Receipt Number
                    </Label>
                    <Input
                      id="receiptNumber"
                      name="receiptNumber"
                      value={newFee.receiptNumber || ""}
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
                      value={newFee.date || ""}
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
                      value={newFee.description || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paidBy" className="text-right">
                      Paid By
                    </Label>
                    <Input
                      id="paidBy"
                      name="paidBy"
                      value={newFee.paidBy || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="referenceNumber" className="text-right">
                      Reference Number
                    </Label>
                    <Input
                      id="referenceNumber"
                      name="referenceNumber"
                      value={newFee.referenceNumber || ""}
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
                      value={newFee.amount || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="collectedBy" className="text-right">
                      Collected By
                    </Label>
                    <Input
                      id="collectedBy"
                      name="collectedBy"
                      value={newFee.collectedBy || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentMode" className="text-right">
                      Payment Mode
                    </Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("paymentMode", value)}
                      defaultValue={newFee.paymentMode}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="remarks" className="text-right">
                      Remarks
                    </Label>
                    <Input
                      id="remarks"
                      name="remarks"
                      value={newFee.remarks || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddFee}>Add Fee</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Fees</TabsTrigger>
            <TabsTrigger value="notice">Notice Fees</TabsTrigger>
            <TabsTrigger value="warrant">Warrant Fees</TabsTrigger>
            <TabsTrigger value="other">Other Fees</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Paid By</TableHead>
                <TableHead>Reference No.</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Collected By</TableHead>
                <TableHead>Payment Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.receiptNumber}</TableCell>
                  <TableCell>{fee.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        fee.feeType === "Notice Fee"
                          ? "bg-blue-100 text-blue-800"
                          : fee.feeType === "Warrant Fee"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {fee.feeType}
                    </span>
                  </TableCell>
                  <TableCell>{fee.description}</TableCell>
                  <TableCell>{fee.paidBy}</TableCell>
                  <TableCell>{fee.referenceNumber}</TableCell>
                  <TableCell className="text-right">
                    {fee.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{fee.collectedBy}</TableCell>
                  <TableCell>{fee.paymentMode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
