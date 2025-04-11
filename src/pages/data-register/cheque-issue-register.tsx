"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

interface ChequeEntry {
  id: string
  chequeNo: string
  date: Date
  payeeName: string
  purpose: string
  amount: number
  bankAccount: string
  status: "cleared" | "pending" | "cancelled"
}

export default function ChequeIssueRegister() {
  const [cheques, setCheques] = useState<ChequeEntry[]>([
    {
      id: "1",
      chequeNo: "123456",
      date: new Date(2023, 3, 10),
      payeeName: "ABC Contractors",
      purpose: "Road Construction Work",
      amount: 250000,
      bankAccount: "SBI - 10023456789",
      status: "cleared",
    },
    {
      id: "2",
      chequeNo: "123457",
      date: new Date(2023, 3, 12),
      payeeName: "XYZ Suppliers",
      purpose: "Office Equipment",
      amount: 75000,
      bankAccount: "SBI - 10023456789",
      status: "pending",
    },
    {
      id: "3",
      chequeNo: "123458",
      date: new Date(2023, 3, 15),
      payeeName: "Municipal Staff Welfare Fund",
      purpose: "Monthly Contribution",
      amount: 50000,
      bankAccount: "SBI - 10023456789",
      status: "cleared",
    },
    {
      id: "4",
      chequeNo: "123459",
      date: new Date(2023, 3, 18),
      payeeName: "PQR Services",
      purpose: "Maintenance Contract",
      amount: 35000,
      bankAccount: "SBI - 10023456789",
      status: "cancelled",
    },
  ])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form state
  const [newCheque, setNewCheque] = useState<Partial<ChequeEntry>>({
    date: new Date(),
    bankAccount: "SBI - 10023456789",
    status: "pending",
  })

  const handleInputChange = (field: string, value: any) => {
    setNewCheque({
      ...newCheque,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    // Generate a new ID and cheque number
    const newId = (cheques.length + 1).toString()
    const lastChequeNo = Number.parseInt(cheques[cheques.length - 1].chequeNo)
    const newChequeNo = (lastChequeNo + 1).toString()

    const newChequeEntry: ChequeEntry = {
      id: newId,
      chequeNo: newChequeNo,
      date: newCheque.date || new Date(),
      payeeName: newCheque.payeeName || "",
      purpose: newCheque.purpose || "",
      amount: Number(newCheque.amount) || 0,
      bankAccount: newCheque.bankAccount || "SBI - 10023456789",
      status: (newCheque.status as "cleared" | "pending" | "cancelled") || "pending",
    }

    setCheques([...cheques, newChequeEntry])
    setIsModalOpen(false)
    // Reset form
    setNewCheque({
      date: new Date(),
      bankAccount: "SBI - 10023456789",
      status: "pending",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "cleared":
        return <Badge className="bg-green-500">Cleared</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cheque Issue Register</CardTitle>
        <CardDescription>Record of all cheques issued by the department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search cheques..." className="pl-8" />
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
              Issue Cheque
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cheque No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payee Name</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cheques.map((cheque) => (
                <TableRow key={cheque.id}>
                  <TableCell className="font-medium">{cheque.chequeNo}</TableCell>
                  <TableCell>{format(cheque.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{cheque.payeeName}</TableCell>
                  <TableCell>{cheque.purpose}</TableCell>
                  <TableCell className="text-right">{cheque.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{cheque.bankAccount}</TableCell>
                  <TableCell>{getStatusBadge(cheque.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Cleared</Badge>
              <span className="text-sm">
                ₹
                {cheques
                  .filter((c) => c.status === "cleared")
                  .reduce((sum, c) => sum + c.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-amber-500 border-amber-500">
                Pending
              </Badge>
              <span className="text-sm">
                ₹
                {cheques
                  .filter((c) => c.status === "pending")
                  .reduce((sum, c) => sum + c.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Cancelled</Badge>
              <span className="text-sm">
                ₹
                {cheques
                  .filter((c) => c.status === "cancelled")
                  .reduce((sum, c) => sum + c.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Total Issued:{" "}
            <span className="font-semibold">
              ₹{cheques.reduce((sum, c) => sum + c.amount, 0).toLocaleString("en-IN")}
            </span>
          </p>
        </div>

        {/* Issue Cheque Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Issue New Cheque</DialogTitle>
              <DialogDescription>Enter the details of the new cheque to be issued.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payeeName" className="text-right">
                  Payee Name
                </Label>
                <Input
                  id="payeeName"
                  value={newCheque.payeeName || ""}
                  onChange={(e) => handleInputChange("payeeName", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  Purpose
                </Label>
                <Input
                  id="purpose"
                  value={newCheque.purpose || ""}
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
                  value={newCheque.amount || ""}
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
                        !newCheque.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newCheque.date ? format(newCheque.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newCheque.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bankAccount" className="text-right">
                  Bank Account
                </Label>
                <Select
                  value={newCheque.bankAccount}
                  onValueChange={(value) => handleInputChange("bankAccount", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SBI - 10023456789">SBI - 10023456789</SelectItem>
                    <SelectItem value="PNB - 20034567890">PNB - 20034567890</SelectItem>
                    <SelectItem value="BOB - 30045678901">BOB - 30045678901</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={newCheque.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cleared">Cleared</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Issue Cheque
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
