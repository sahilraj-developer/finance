"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Droplet, Download, FileText, Printer, Search, Plus, Filter, ArrowUpRight } from "lucide-react"

// Sample data for demonstration
const waterTaxRecords = [
  {
    id: "WT001",
    connectionId: "RMC-W-12345",
    owner: "Ramesh Kumar",
    address: "123, Main Road, Ward 5, Ranchi",
    connectionType: "Residential",
    meterNo: "M-12345",
    annualTax: 6000,
    status: "paid",
    dueDate: "2023-03-31",
    paidDate: "2023-03-15",
  },
  {
    id: "WT002",
    connectionId: "RMC-W-12346",
    owner: "Suresh Patel",
    address: "45, Market Street, Ward 3, Ranchi",
    connectionType: "Commercial",
    meterNo: "M-12346",
    annualTax: 12000,
    status: "paid",
    dueDate: "2023-03-31",
    paidDate: "2023-03-20",
  },
  {
    id: "WT003",
    connectionId: "RMC-W-12347",
    owner: "Priya Sharma",
    address: "78, Lake Road, Ward 7, Ranchi",
    connectionType: "Residential",
    meterNo: "M-12347",
    annualTax: 6000,
    status: "pending",
    dueDate: "2023-03-31",
    paidDate: null,
  },
  {
    id: "WT004",
    connectionId: "RMC-W-12348",
    owner: "Ajay Singh",
    address: "22, Gandhi Nagar, Ward 2, Ranchi",
    connectionType: "Residential",
    meterNo: "M-12348",
    annualTax: 6000,
    status: "overdue",
    dueDate: "2022-12-31",
    paidDate: null,
  },
  {
    id: "WT005",
    connectionId: "RMC-W-12349",
    owner: "Neha Gupta",
    address: "56, Civil Lines, Ward 1, Ranchi",
    connectionType: "Commercial",
    meterNo: "M-12349",
    annualTax: 12000,
    status: "paid",
    dueDate: "2023-03-31",
    paidDate: "2023-02-28",
  },
]

// api
// /getall

// /post-data -

// {
//   "connectionId": "string",      
//   "owner": "string",             
//   "address": "string",           
//   "connectionType": "string",    
//   "meterNo": "string",           
//   "annualTax": "number",        
//   "status": "string",
//   "dueDate": "string",           
//   "paidDate": "string"           
// }


export default function WaterTaxPage() {
  const router = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter records based on search term and active tab
  const filteredRecords = waterTaxRecords.filter((record) => {
    const matchesSearch =
      record.connectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.meterNo.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "paid") return matchesSearch && record.status === "paid"
    if (activeTab === "pending") return matchesSearch && record.status === "pending"
    if (activeTab === "overdue") return matchesSearch && record.status === "overdue"

    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet className="h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight">Water Tax Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by connection ID, owner name, or meter number..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button onClick={() => router("/water-tax/new-connection")}>
            <Plus className="mr-2 h-4 w-4" />
            New Connection
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Tax Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Connections</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <WaterTaxTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="paid" className="mt-4">
              <WaterTaxTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <WaterTaxTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="overdue" className="mt-4">
              <WaterTaxTable records={filteredRecords} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Pay Water Tax</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Make a payment for your water connection</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" size="sm" className="w-full" onClick={() => router("/water-tax/payment")}>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Proceed
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base">View Tax Receipt</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Download or print your tax receipt</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" size="sm" className="w-full" onClick={() => router("/water-tax/receipts")}>
                <FileText className="mr-2 h-4 w-4" />
                View Receipts
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Report Issue</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Report water supply issues or leakage</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/water-tax/report-issue")}
              >
                <Search className="mr-2 h-4 w-4" />
                Report
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

function WaterTaxTable({ records }: { records: typeof waterTaxRecords }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Connection ID</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="hidden md:table-cell">Meter No.</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="text-right">Annual Tax</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.connectionId}</TableCell>
                <TableCell>{record.owner}</TableCell>
                <TableCell className="hidden md:table-cell">{record.meterNo}</TableCell>
                <TableCell className="hidden md:table-cell">{record.connectionType}</TableCell>
                <TableCell className="text-right">₹{record.annualTax.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status === "paid" ? "outline" : record.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {record.status === "paid" ? "Paid" : record.status === "pending" ? "Pending" : "Overdue"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => (window.location.href = `/water-tax/details/${record.id}`)}
                    >
                      View
                    </Button>
                    {record.status !== "paid" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (window.location.href = `/water-tax/payment?id=${record.id}`)}
                      >
                        Pay
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

