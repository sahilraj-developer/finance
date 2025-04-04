"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building, Download, FileText, Printer, Search, Plus, Filter, ArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample data for demonstration
const propertyTaxRecords = [
  {
    id: "PT001",
    propertyId: "RMC-P-12345",
    owner: "Ramesh Kumar",
    address: "123, Main Road, Ward 5, Ranchi",
    assessedValue: 1500000,
    annualTax: 15000,
    status: "paid",
    dueDate: "2023-03-31",
    paidDate: "2023-03-15",
  },
  {
    id: "PT002",
    propertyId: "RMC-P-12346",
    owner: "Suresh Patel",
    address: "45, Market Street, Ward 3, Ranchi",
    assessedValue: 2200000,
    annualTax: 22000,
    status: "paid",
    dueDate: "2023-03-31",
    paidDate: "2023-03-20",
  },
  {
    id: "PT003",
    propertyId: "RMC-P-12347",
    owner: "Priya Sharma",
    address: "78, Lake Road, Ward 7, Ranchi",
    assessedValue: 3500000,
    annualTax: 35000,
    status: "pending",
    dueDate: "2023-03-31",
    paidDate: null,
  },
  {
    id: "PT004",
    propertyId: "RMC-P-12348",
    owner: "Ajay Singh",
    address: "22, Gandhi Nagar, Ward 2, Ranchi",
    assessedValue: 1800000,
    annualTax: 18000,
    status: "overdue",
    dueDate: "2022-12-31",
    paidDate: null,
  },
  {
    id: "PT005",
    propertyId: "RMC-P-12349",
    owner: "Neha Gupta",
    address: "56, Civil Lines, Ward 1, Ranchi",
    assessedValue: 4200000,
    annualTax: 42000,
    status: "paid",
    dueDate: "2023-03-31",
    paidDate: "2023-02-28",
  },
]


// api
// /getall

// /post-data -

// {
//   "propertyId": "string",        
//   "owner": "string",            
//   "address": "string",           
//   "assessedValue": "number",     
//   "annualTax": "number",         
//   "status": "string",           
//   "dueDate": "string",           
//   "paidDate": "string"           
// }



export default function PropertyTaxPage() {
  const router = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter records based on search term and active tab
  const filteredRecords = propertyTaxRecords.filter((record) => {
    const matchesSearch =
      record.propertyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.address.toLowerCase().includes(searchTerm.toLowerCase())

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
          <Building className="h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight">Property Tax Management</h1>
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
            placeholder="Search by property ID, owner name, or address..."
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
          <Button onClick={() => router("/property-tax/new-assessment")}>
            <Plus className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Tax Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <PropertyTaxTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="paid" className="mt-4">
              <PropertyTaxTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <PropertyTaxTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="overdue" className="mt-4">
              <PropertyTaxTable records={filteredRecords} />
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
              <CardTitle className="text-base">Pay Property Tax</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Make a payment for your property tax</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/property-tax/payment")}
              >
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
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/property-tax/receipts")}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Receipts
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Calculate Tax</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Estimate your property tax amount</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/property-tax/calculator")}
              >
                <Search className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

function PropertyTaxTable({ records }: { records: typeof propertyTaxRecords }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property ID</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
            <TableHead className="hidden md:table-cell">Assessed Value</TableHead>
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
                <TableCell className="font-medium">{record.propertyId}</TableCell>
                <TableCell>{record.owner}</TableCell>
                <TableCell className="hidden md:table-cell">{record.address}</TableCell>
                <TableCell className="hidden md:table-cell">₹{record.assessedValue.toLocaleString("en-IN")}</TableCell>
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
                      onClick={() => (window.location.href = `/property-tax/details/${record.id}`)}
                    >
                      View
                    </Button>
                    {record.status !== "paid" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (window.location.href = `/property-tax/payment?id=${record.id}`)}
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

