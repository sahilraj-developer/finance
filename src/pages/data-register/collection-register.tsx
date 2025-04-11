"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Download, Plus, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CollectionEntry {
  id: string
  receiptNo: string
  date: Date
  collectedFrom: string
  purpose: string
  amount: number
  modeOfPayment: string
  referenceNo?: string
}

export default function CollectionRegister() {
  const [collections, setCollections] = useState<CollectionEntry[]>([
    {
      id: "1",
      receiptNo: "REC-001",
      date: new Date(2023, 3, 15),
      collectedFrom: "ABC Corporation",
      purpose: "Property Tax",
      amount: 25000,
      modeOfPayment: "Cheque",
      referenceNo: "CHQ-78901",
    },
    {
      id: "2",
      receiptNo: "REC-002",
      date: new Date(2023, 3, 16),
      collectedFrom: "John Doe",
      purpose: "Water Charges",
      amount: 1200,
      modeOfPayment: "Cash",
    },
    {
      id: "3",
      receiptNo: "REC-003",
      date: new Date(2023, 3, 18),
      collectedFrom: "XYZ Ltd.",
      purpose: "License Fee",
      amount: 5000,
      modeOfPayment: "Online",
      referenceNo: "TXN-12345",
    },
  ])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form state
  const [newEntry, setNewEntry] = useState<Partial<CollectionEntry>>({
    date: new Date(),
    modeOfPayment: "Cash",
  })

  const handleInputChange = (field: string, value: any) => {
    setNewEntry({
      ...newEntry,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    // Generate a new ID and receipt number
    const newId = (collections.length + 1).toString()
    const newReceiptNo = `REC-${(collections.length + 1).toString().padStart(3, "0")}`

    const newCollection: CollectionEntry = {
      id: newId,
      receiptNo: newReceiptNo,
      date: newEntry.date || new Date(),
      collectedFrom: newEntry.collectedFrom || "",
      purpose: newEntry.purpose || "",
      amount: Number(newEntry.amount) || 0,
      modeOfPayment: newEntry.modeOfPayment || "Cash",
      referenceNo: newEntry.referenceNo,
    }

    setCollections([...collections, newCollection])
    setIsModalOpen(false)
    // Reset form
    setNewEntry({
      date: new Date(),
      modeOfPayment: "Cash",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collection Register</CardTitle>
        <CardDescription>Record of all collections received by the department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search collections..." className="pl-8" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Collected From</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Mode of Payment</TableHead>
                <TableHead>Reference No.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.receiptNo}</TableCell>
                  <TableCell>{format(entry.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{entry.collectedFrom}</TableCell>
                  <TableCell>{entry.purpose}</TableCell>
                  <TableCell className="text-right">{entry.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{entry.modeOfPayment}</TableCell>
                  <TableCell>{entry.referenceNo || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-right">
          <p className="text-sm text-muted-foreground">
            Total Collections:{" "}
            <span className="font-semibold">
              ₹{collections.reduce((sum, entry) => sum + entry.amount, 0).toLocaleString("en-IN")}
            </span>
          </p>
        </div>

        {/* Add Entry Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Collection</DialogTitle>
              <DialogDescription>Enter the details of the new collection entry.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="collectedFrom" className="text-right">
                  Collected From
                </Label>
                <Input
                  id="collectedFrom"
                  value={newEntry.collectedFrom || ""}
                  onChange={(e) => handleInputChange("collectedFrom", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  Purpose
                </Label>
                <Input
                  id="purpose"
                  value={newEntry.purpose || ""}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount (₹)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newEntry.amount || ""}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !newEntry.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newEntry.date ? format(newEntry.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newEntry.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="modeOfPayment" className="text-right">
                  Payment Mode
                </Label>
                <Select
                  value={newEntry.modeOfPayment}
                  onValueChange={(value) => handleInputChange("modeOfPayment", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="RTGS">RTGS</SelectItem>
                    <SelectItem value="NEFT">NEFT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(newEntry.modeOfPayment === "Cheque" ||
                newEntry.modeOfPayment === "Online" ||
                newEntry.modeOfPayment === "RTGS" ||
                newEntry.modeOfPayment === "NEFT") && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="referenceNo" className="text-right">
                    Reference No.
                  </Label>
                  <Input
                    id="referenceNo"
                    value={newEntry.referenceNo || ""}
                    onChange={(e) => handleInputChange("referenceNo", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
