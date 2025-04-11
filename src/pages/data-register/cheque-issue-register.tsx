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
            <Button>
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
      </CardContent>
    </Card>
  )
}
