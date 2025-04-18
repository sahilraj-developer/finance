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

interface IncomeEntry {
  id: string
  date: string
  voucherNumber: string
  function: string
  subFunction: string
  description: string
  amount: number
  receivedFrom: string
  receiptNumber: string
}

export default function IncomeSubsidiaryLedger() {
  const [entries, setEntries] = useState<IncomeEntry[]>([
    {
      id: "1",
      date: "2023-01-15",
      voucherNumber: "INC-2023-001",
      function: "General Public Services",
      subFunction: "Tax Collection",
      description: "Property Tax Collection",
      amount: 125000,
      receivedFrom: "Various Property Owners",
      receiptNumber: "REC-2023-0125",
    },
    {
      id: "2",
      date: "2023-01-22",
      voucherNumber: "INC-2023-002",
      function: "Economic Affairs",
      subFunction: "Business Permits",
      description: "Business Permit Fees",
      amount: 45000,
      receivedFrom: "Various Business Owners",
      receiptNumber: "REC-2023-0126",
    },
    {
      id: "3",
      date: "2023-02-05",
      voucherNumber: "INC-2023-003",
      function: "General Public Services",
      subFunction: "Administrative Fees",
      description: "Document Processing Fees",
      amount: 12500,
      receivedFrom: "Various Citizens",
      receiptNumber: "REC-2023-0127",
    },
  ])

  const [newEntry, setNewEntry] = useState<Partial<IncomeEntry>>({})
  const [open, setOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      date: newEntry.date || new Date().toISOString().split("T")[0],
      voucherNumber:
        newEntry.voucherNumber || `INC-${new Date().getFullYear()}-${(entries.length + 1).toString().padStart(3, "0")}`,
      function: newEntry.function || "",
      subFunction: newEntry.subFunction || "",
      description: newEntry.description || "",
      amount: newEntry.amount || 0,
      receivedFrom: newEntry.receivedFrom || "",
      receiptNumber: newEntry.receiptNumber || "",
    }

    setEntries([...entries, entry])
    setNewEntry({})
    setOpen(false)
  }

  // Calculate total by function
  const totalsByFunction = entries.reduce(
    (acc, entry) => {
      const func = entry.function
      if (!acc[func]) {
        acc[func] = 0
      }
      acc[func] += entry.amount
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Function-wise Income Subsidiary Ledger</CardTitle>
        <CardDescription>Record of all income categorized by government function</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Income Entry</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                  <Label htmlFor="voucherNumber" className="text-right">
                    Voucher Number
                  </Label>
                  <Input
                    id="voucherNumber"
                    name="voucherNumber"
                    value={newEntry.voucherNumber || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="function" className="text-right">
                    Function
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("function", value)}
                    defaultValue={newEntry.function}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Public Services">General Public Services</SelectItem>
                      <SelectItem value="Public Order and Safety">Public Order and Safety</SelectItem>
                      <SelectItem value="Economic Affairs">Economic Affairs</SelectItem>
                      <SelectItem value="Environmental Protection">Environmental Protection</SelectItem>
                      <SelectItem value="Housing and Community Amenities">Housing and Community Amenities</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Recreation, Culture and Religion">Recreation, Culture and Religion</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Social Protection">Social Protection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subFunction" className="text-right">
                    Sub-Function
                  </Label>
                  <Input
                    id="subFunction"
                    name="subFunction"
                    value={newEntry.subFunction || ""}
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
                    value={newEntry.description || ""}
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
                  <Label htmlFor="receivedFrom" className="text-right">
                    Received From
                  </Label>
                  <Input
                    id="receivedFrom"
                    name="receivedFrom"
                    value={newEntry.receivedFrom || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="receiptNumber" className="text-right">
                    Receipt Number
                  </Label>
                  <Input
                    id="receiptNumber"
                    name="receiptNumber"
                    value={newEntry.receiptNumber || ""}
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

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Voucher No.</TableHead>
                <TableHead>Function</TableHead>
                <TableHead>Sub-Function</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Received From</TableHead>
                <TableHead>Receipt No.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.voucherNumber}</TableCell>
                  <TableCell>{entry.function}</TableCell>
                  <TableCell>{entry.subFunction}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="text-right">
                    {entry.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>{entry.receivedFrom}</TableCell>
                  <TableCell>{entry.receiptNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Summary by Function</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Function</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(totalsByFunction).map(([func, total]) => (
                  <TableRow key={func}>
                    <TableCell>{func}</TableCell>
                    <TableCell className="text-right">
                      {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {entries
                      .reduce((sum, entry) => sum + entry.amount, 0)
                      .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
