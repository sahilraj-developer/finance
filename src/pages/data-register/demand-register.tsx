"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Plus, Search, CalendarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DemandEntry {
  id: string
  demandNo: string
  demandDate: Date
  partyName: string
  demandType: string
  amount: number
  dueDate: Date
  collectedAmount: number
  status: "paid" | "partial" | "pending" | "overdue"
}

export default function DemandRegister() {
  const [demands, setDemands] = useState<DemandEntry[]>([
    {
      id: "1",
      demandNo: "DEM-001",
      demandDate: new Date(2023, 2, 15),
      partyName: "ABC Corporation",
      demandType: "Property Tax",
      amount: 50000,
      dueDate: new Date(2023, 3, 15),
      collectedAmount: 50000,
      status: "paid",
    },
    {
      id: "2",
      demandNo: "DEM-002",
      demandDate: new Date(2023, 2, 20),
      partyName: "XYZ Enterprises",
      demandType: "Trade License Fee",
      amount: 25000,
      dueDate: new Date(2023, 3, 20),
      collectedAmount: 15000,
      status: "partial",
    },
    {
      id: "3",
      demandNo: "DEM-003",
      demandDate: new Date(2023, 2, 25),
      partyName: "John Doe",
      demandType: "Water Charges",
      amount: 5000,
      dueDate: new Date(2023, 3, 25),
      collectedAmount: 0,
      status: "pending",
    },
    {
      id: "4",
      demandNo: "DEM-004",
      demandDate: new Date(2023, 2, 10),
      partyName: "PQR Ltd.",
      demandType: "Rent",
      amount: 30000,
      dueDate: new Date(2023, 3, 10),
      collectedAmount: 0,
      status: "overdue",
    },
  ])

  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form state
  const [newDemand, setNewDemand] = useState<Partial<DemandEntry>>({
    demandDate: new Date(),
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    collectedAmount: 0,
    status: "pending",
  })

  const handleInputChange = (field: string, value: any) => {
    setNewDemand({
      ...newDemand,
      [field]: value,
    })

    // Auto-calculate status based on amount and collected amount
    if (field === "amount" || field === "collectedAmount") {
      const amount = field === "amount" ? Number(value) : Number(newDemand.amount) || 0
      const collected = field === "collectedAmount" ? Number(value) : Number(newDemand.collectedAmount) || 0

      let status: "paid" | "partial" | "pending" | "overdue" = "pending"

      if (collected >= amount && amount > 0) {
        status = "paid"
      } else if (collected > 0 && collected < amount) {
        status = "partial"
      } else if (newDemand.dueDate && newDemand.dueDate < new Date() && collected < amount) {
        status = "overdue"
      }

      setNewDemand((prev) => ({
        ...prev,
        status,
      }))
    }
  }

  const handleSubmit = () => {
    // Generate a new ID and demand number
    const newId = (demands.length + 1).toString()
    const newDemandNo = `DEM-${(demands.length + 1).toString().padStart(3, "0")}`

    const newDemandEntry: DemandEntry = {
      id: newId,
      demandNo: newDemandNo,
      demandDate: newDemand.demandDate || new Date(),
      partyName: newDemand.partyName || "",
      demandType: newDemand.demandType || "",
      amount: Number(newDemand.amount) || 0,
      dueDate: newDemand.dueDate || new Date(new Date().setMonth(new Date().getMonth() + 1)),
      collectedAmount: Number(newDemand.collectedAmount) || 0,
      status: (newDemand.status as "paid" | "partial" | "pending" | "overdue") || "pending",
    }

    setDemands([...demands, newDemandEntry])
    setIsModalOpen(false)
    // Reset form
    setNewDemand({
      demandDate: new Date(),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      collectedAmount: 0,
      status: "pending",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "partial":
        return <Badge className="bg-amber-500">Partial</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demand Register</CardTitle>
        <CardDescription>Record of all demands raised for various dues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search demands..." className="pl-8" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Demand type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="property">Property Tax</SelectItem>
                <SelectItem value="water">Water Charges</SelectItem>
                <SelectItem value="license">License Fee</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
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
              Raise Demand
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Demand No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Party Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Collected (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demands.map((demand) => (
                <TableRow key={demand.id}>
                  <TableCell className="font-medium">{demand.demandNo}</TableCell>
                  <TableCell>{formatDate(demand.demandDate)}</TableCell>
                  <TableCell>{demand.partyName}</TableCell>
                  <TableCell>{demand.demandType}</TableCell>
                  <TableCell className="text-right">{demand.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{formatDate(demand.dueDate)}</TableCell>
                  <TableCell className="text-right">{demand.collectedAmount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{getStatusBadge(demand.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">Paid</Badge>
              <span className="text-sm">
                ₹
                {demands
                  .filter((d) => d.status === "paid")
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500">Partial</Badge>
              <span className="text-sm">
                ₹
                {demands
                  .filter((d) => d.status === "partial")
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Pending</Badge>
              <span className="text-sm">
                ₹
                {demands
                  .filter((d) => d.status === "pending")
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Overdue</Badge>
              <span className="text-sm">
                ₹
                {demands
                  .filter((d) => d.status === "overdue")
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Total Demand:{" "}
              <span className="font-semibold">
                ₹{demands.reduce((sum, d) => sum + d.amount, 0).toLocaleString("en-IN")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Total Collected:{" "}
              <span className="font-semibold">
                ₹{demands.reduce((sum, d) => sum + d.collectedAmount, 0).toLocaleString("en-IN")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Balance:{" "}
              <span className="font-semibold">
                ₹{demands.reduce((sum, d) => sum + (d.amount - d.collectedAmount), 0).toLocaleString("en-IN")}
              </span>
            </p>
          </div>
        </div>

        {/* Raise Demand Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Raise New Demand</DialogTitle>
              <DialogDescription>Enter the details of the new demand to be raised.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partyName" className="text-right">
                  Party Name
                </Label>
                <Input
                  id="partyName"
                  value={newDemand.partyName || ""}
                  onChange={(e) => handleInputChange("partyName", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="demandType" className="text-right">
                  Demand Type
                </Label>
                <Select value={newDemand.demandType} onValueChange={(value) => handleInputChange("demandType", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Property Tax">Property Tax</SelectItem>
                    <SelectItem value="Water Charges">Water Charges</SelectItem>
                    <SelectItem value="Trade License Fee">Trade License Fee</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount (₹)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newDemand.amount || ""}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="demandDate" className="text-right">
                  Demand Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !newDemand.demandDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newDemand.demandDate ? format(newDemand.demandDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newDemand.demandDate}
                      onSelect={(date) => handleInputChange("demandDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !newDemand.dueDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newDemand.dueDate ? format(newDemand.dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newDemand.dueDate}
                      onSelect={(date) => handleInputChange("dueDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="collectedAmount" className="text-right">
                  Collected (₹)
                </Label>
                <Input
                  id="collectedAmount"
                  type="number"
                  value={newDemand.collectedAmount || ""}
                  onChange={(e) => handleInputChange("collectedAmount", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3 flex items-center">
                  {getStatusBadge(newDemand.status || "pending")}
                  <span className="ml-2 text-sm text-muted-foreground">(Auto-calculated)</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Raise Demand
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
