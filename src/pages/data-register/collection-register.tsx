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
            <Button>
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
      </CardContent>
    </Card>
  )
}
