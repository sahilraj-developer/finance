"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, Plus, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DepositEntry {
  id: string
  depositNo: string
  date: Date
  depositedBy: string
  purpose: string
  amount: number
  bankAccount: string
  modeOfDeposit: string
  referenceNo?: string
}

export default function DepositRegister() {
  const [deposits, setDeposits] = useState<DepositEntry[]>([
    {
      id: "1",
      depositNo: "DEP-001",
      date: new Date(2023, 3, 5),
      depositedBy: "Finance Department",
      purpose: "Tax Collection",
      amount: 500000,
      bankAccount: "SBI - 10023456789",
      modeOfDeposit: "RTGS",
      referenceNo: "RTGS12345678",
    },
    {
      id: "2",
      depositNo: "DEP-002",
      date: new Date(2023, 3, 8),
      depositedBy: "Revenue Department",
      purpose: "License Fee Collection",
      amount: 75000,
      bankAccount: "SBI - 10023456789",
      modeOfDeposit: "Cash",
    },
    {
      id: "3",
      depositNo: "DEP-003",
      date: new Date(2023, 3, 12),
      depositedBy: "Water Department",
      purpose: "Water Charges",
      amount: 125000,
      bankAccount: "SBI - 10023456789",
      modeOfDeposit: "Cheque",
      referenceNo: "CHQ-123456",
    },
    {
      id: "4",
      depositNo: "DEP-004",
      date: new Date(2023, 3, 15),
      depositedBy: "Property Department",
      purpose: "Rent Collection",
      amount: 200000,
      bankAccount: "SBI - 10023456789",
      modeOfDeposit: "NEFT",
      referenceNo: "NEFT87654321",
    },
  ])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filterAccount, setFilterAccount] = useState<string>("all")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Register</CardTitle>
        <CardDescription>Record of all deposits made to government accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search deposits..." className="pl-8" />
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
            <Select value={filterAccount} onValueChange={setFilterAccount}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="sbi">SBI - 10023456789</SelectItem>
                <SelectItem value="pnb">PNB - 20034567890</SelectItem>
                <SelectItem value="bob">BOB - 30045678901</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Deposit
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deposit No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Deposited By</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Reference No.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{deposit.depositNo}</TableCell>
                  <TableCell>{format(deposit.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{deposit.depositedBy}</TableCell>
                  <TableCell>{deposit.purpose}</TableCell>
                  <TableCell className="text-right">{deposit.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{deposit.bankAccount}</TableCell>
                  <TableCell>{deposit.modeOfDeposit}</TableCell>
                  <TableCell>{deposit.referenceNo || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cash:</span>
              <span className="text-sm">
                ₹
                {deposits
                  .filter((d) => d.modeOfDeposit === "Cash")
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cheque:</span>
              <span className="text-sm">
                ₹
                {deposits
                  .filter((d) => d.modeOfDeposit === "Cheque")
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Electronic:</span>
              <span className="text-sm">
                ₹
                {deposits
                  .filter((d) => ["RTGS", "NEFT"].includes(d.modeOfDeposit))
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Total Deposits:{" "}
            <span className="font-semibold">
              ₹{deposits.reduce((sum, d) => sum + d.amount, 0).toLocaleString("en-IN")}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
