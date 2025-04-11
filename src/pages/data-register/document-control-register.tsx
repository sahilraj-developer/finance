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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form state
  const [newDocument, setNewDocument] = useState<Partial<DocumentEntry>>({
    receivedDate: new Date(),
    balance: 0,
    status: "in-stock",
  })

  const handleInputChange = (field: string, value: any) => {
    setNewDocument({
      ...newDocument,
      [field]: value,
    })

    // Auto-calculate quantity and balance based on serial numbers
    if (field === "serialFrom" || field === "serialTo") {
      if (newDocument.serialFrom && newDocument.serialTo) {
        const serialFrom = field === "serialFrom" ? value : newDocument.serialFrom
        const serialTo = field === "serialTo" ? value : newDocument.serialTo

        // Extract numeric parts if they exist
        const fromMatch = serialFrom.match(/\d+/)
        const toMatch = serialTo.match(/\d+/)

        if (fromMatch && toMatch) {
          const fromNum = Number.parseInt(fromMatch[0])
          const toNum = Number.parseInt(toMatch[0])

          if (!isNaN(fromNum) && !isNaN(toNum) && toNum >= fromNum) {
            const quantity = toNum - fromNum + 1
            setNewDocument((prev) => ({
              ...prev,
              quantity,
              balance: quantity,
            }))
          }
        }
      }
    }

    // Auto-calculate status based on balance and quantity
    if (field === "balance" || field === "quantity" || field === "issuedTo") {
      const balance = field === "balance" ? Number(value) : Number(newDocument.balance) || 0
      const quantity = field === "quantity" ? Number(value) : Number(newDocument.quantity) || 0
      const issuedTo = field === "issuedTo" ? value : newDocument.issuedTo

      let status: "in-stock" | "partially-issued" | "fully-issued" = "in-stock"

      if (issuedTo) {
        if (balance === 0 && quantity > 0) {
          status = "fully-issued"
        } else if (balance < quantity) {
          status = "partially-issued"
        }
      }

      setNewDocument((prev) => ({
        ...prev,
        status,
      }))
    }
  }

  const handleSubmit = () => {
    // Generate a new ID
    const newId = (documents.length + 1).toString()

    const newDocumentEntry: DocumentEntry = {
      id: newId,
      documentType: newDocument.documentType || "",
      serialFrom: newDocument.serialFrom || "",
      serialTo: newDocument.serialTo || "",
      quantity: Number(newDocument.quantity) || 0,
      receivedDate: newDocument.receivedDate || new Date(),
      issuedTo: newDocument.issuedTo || "",
      issuedDate: newDocument.issuedDate,
      balance: Number(newDocument.balance) || 0,
      status: (newDocument.status as "in-stock" | "partially-issued" | "fully-issued") || "in-stock",
    }

    setDocuments([...documents, newDocumentEntry])
    setIsModalOpen(false)
    // Reset form
    setNewDocument({
      receivedDate: new Date(),
      balance: 0,
      status: "in-stock",
    })
  }

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
            <Button onClick={() => setIsModalOpen(true)}>
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

        {/* Add Document Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
              <DialogDescription>Enter the details of the new document entry.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="documentType" className="text-right">
                  Document Type
                </Label>
                <Select
                  value={newDocument.documentType}
                  onValueChange={(value) => handleInputChange("documentType", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Receipt Book">Receipt Book</SelectItem>
                    <SelectItem value="Cheque Book">Cheque Book</SelectItem>
                    <SelectItem value="License Form">License Form</SelectItem>
                    <SelectItem value="Property Tax Form">Property Tax Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serialFrom" className="text-right">
                  Serial From
                </Label>
                <Input
                  id="serialFrom"
                  value={newDocument.serialFrom || ""}
                  onChange={(e) => handleInputChange("serialFrom", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serialTo" className="text-right">
                  Serial To
                </Label>
                <Input
                  id="serialTo"
                  value={newDocument.serialTo || ""}
                  onChange={(e) => handleInputChange("serialTo", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newDocument.quantity || ""}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="receivedDate" className="text-right">
                  Received Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !newDocument.receivedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newDocument.receivedDate ? format(newDocument.receivedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newDocument.receivedDate}
                      onSelect={(date) => handleInputChange("receivedDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issuedTo" className="text-right">
                  Issued To
                </Label>
                <Input
                  id="issuedTo"
                  value={newDocument.issuedTo || ""}
                  onChange={(e) => handleInputChange("issuedTo", e.target.value)}
                  className="col-span-3"
                />
              </div>
              {newDocument.issuedTo && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="issuedDate" className="text-right">
                    Issued Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3 justify-start text-left font-normal",
                          !newDocument.issuedDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newDocument.issuedDate ? format(newDocument.issuedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newDocument.issuedDate}
                        onSelect={(date) => handleInputChange("issuedDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  Balance
                </Label>
                <Input
                  id="balance"
                  type="number"
                  value={newDocument.balance || ""}
                  onChange={(e) => handleInputChange("balance", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3 flex items-center">
                  {getStatusBadge(newDocument.status || "in-stock")}
                  <span className="ml-2 text-sm text-muted-foreground">(Auto-calculated)</span>
                </div>
              </div>
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
