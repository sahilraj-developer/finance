"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Plus, Search } from "lucide-react"

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
            <Button>
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
      </CardContent>
    </Card>
  )
}
