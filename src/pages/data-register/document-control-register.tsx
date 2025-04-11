"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Download, Plus, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DocumentEntry {
  id: string
  documentType: string
  serialFrom: string
  serialTo: string
  quantity: number
  receivedDate: Date
  issuedTo: string
  issuedDate?: Date
  balance: number
  status: "in-stock" | "partially-issued" | "fully-issued"
}

export default function DocumentControlRegister() {
  const [documents, setDocuments] = useState<DocumentEntry[]>([
    {
      id: "1",
      documentType: "Receipt Book",
      serialFrom: "RB-1001",
      serialTo: "RB-1100",
      quantity: 100,
      receivedDate: new Date(2023, 2, 10),
      issuedTo: "Finance Department",
      issuedDate: new Date(2023, 2, 15),
      balance: 40,
      status: "partially-issued",
    },
    {
      id: "2",
      documentType: "Cheque Book",
      serialFrom: "CHQ-5001",
      serialTo: "CHQ-5050",
      quantity: 50,
      receivedDate: new Date(2023, 3, 5),
      issuedTo: "Accounts Department",
      issuedDate: new Date(2023, 3, 8),
      balance: 0,
      status: "fully-issued",
    },
    {
      id: "3",
      documentType: "License Form",
      serialFrom: "LF-2001",
      serialTo: "LF-2200",
      quantity: 200,
      receivedDate: new Date(2023, 3, 12),
      issuedTo: "",
      balance: 200,
      status: "in-stock",
    },
    {
      id: "4",
      documentType: "Property Tax Form",
      serialFrom: "PTF-3001",
      serialTo: "PTF-3100",
      quantity: 100,
      receivedDate: new Date(2023, 3, 15),
      issuedTo: "Revenue Department",
      issuedDate: new Date(2023, 3, 18),
      balance: 70,
      status: "partially-issued",
    },
  ])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-500">In Stock</Badge>
      case "partially-issued":
        return <Badge className="bg-amber-500">Partially Issued</Badge>
      case "fully-issued":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Fully Issued
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Control Register</CardTitle>
        <CardDescription>Stock account of receipts, checkbooks and other controlled documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search documents..." className="pl-8" />
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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="receipt">Receipt Book</SelectItem>
                <SelectItem value="cheque">Cheque Book</SelectItem>
                <SelectItem value="license">License Form</SelectItem>
                <SelectItem value="property">Property Tax Form</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="partially-issued">Partially Issued</SelectItem>
                <SelectItem value="fully-issued">Fully Issued</SelectItem>
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
              Add Document
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Serial From</TableHead>
                <TableHead>Serial To</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Issued To</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.documentType}</TableCell>
                  <TableCell>{doc.serialFrom}</TableCell>
                  <TableCell>{doc.serialTo}</TableCell>
                  <TableCell className="text-right">{doc.quantity}</TableCell>
                  <TableCell>{format(doc.receivedDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{doc.issuedTo || "-"}</TableCell>
                  <TableCell>{doc.issuedDate ? format(doc.issuedDate, "dd/MM/yyyy") : "-"}</TableCell>
                  <TableCell className="text-right">{doc.balance}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">In Stock</Badge>
              <span className="text-sm">
                {documents.filter((d) => d.status === "in-stock").reduce((sum, d) => sum + d.quantity, 0)} items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500">Partially Issued</Badge>
              <span className="text-sm">
                {documents.filter((d) => d.status === "partially-issued").reduce((sum, d) => sum + d.quantity, 0)} items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-gray-500 border-gray-500">
                Fully Issued
              </Badge>
              <span className="text-sm">
                {documents.filter((d) => d.status === "fully-issued").reduce((sum, d) => sum + d.quantity, 0)} items
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Total Documents:{" "}
              <span className="font-semibold">{documents.reduce((sum, d) => sum + d.quantity, 0)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Available Balance:{" "}
              <span className="font-semibold">{documents.reduce((sum, d) => sum + d.balance, 0)}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
