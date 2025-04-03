"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Store, Download, FileText, Printer, Search, Plus, Filter, ArrowUpRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample data for demonstration
const tradeLicenseRecords = [
  {
    id: "TL001",
    licenseId: "RMC-TL-12345",
    businessName: "Kumar General Store",
    owner: "Ramesh Kumar",
    address: "123, Main Road, Ward 5, Ranchi",
    category: "Retail",
    annualFee: 5000,
    status: "active",
    expiryDate: "2024-03-31",
    renewalStatus: "paid",
  },
  {
    id: "TL002",
    licenseId: "RMC-TL-12346",
    businessName: "Patel Restaurant",
    owner: "Suresh Patel",
    address: "45, Market Street, Ward 3, Ranchi",
    category: "Food",
    annualFee: 8000,
    status: "active",
    expiryDate: "2024-03-31",
    renewalStatus: "paid",
  },
  {
    id: "TL003",
    licenseId: "RMC-TL-12347",
    businessName: "Sharma Textiles",
    owner: "Priya Sharma",
    address: "78, Lake Road, Ward 7, Ranchi",
    category: "Retail",
    annualFee: 5000,
    status: "active",
    expiryDate: "2024-03-31",
    renewalStatus: "pending",
  },
  {
    id: "TL004",
    licenseId: "RMC-TL-12348",
    businessName: "Singh Electronics",
    owner: "Ajay Singh",
    address: "22, Gandhi Nagar, Ward 2, Ranchi",
    category: "Retail",
    annualFee: 5000,
    status: "expired",
    expiryDate: "2022-12-31",
    renewalStatus: "overdue",
  },
  {
    id: "TL005",
    licenseId: "RMC-TL-12349",
    businessName: "Gupta Pharmacy",
    owner: "Neha Gupta",
    address: "56, Civil Lines, Ward 1, Ranchi",
    category: "Medical",
    annualFee: 10000,
    status: "active",
    expiryDate: "2024-03-31",
    renewalStatus: "paid",
  },
]

// api
// /getall

// /post-data -

// {
//   "licenseId": "string",       
//   "businessName": "string",    
//   "owner": "string",           
//   "address": "string",         
//   "category": "string",        
//   "annualFee": "number",       
//   "status": "string",          
//   "expiryDate": "string",      
//   "renewalStatus": "string"    
// }





export default function TradeLicensePage() {
  const router = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter records based on search term and active tab
  const filteredRecords = tradeLicenseRecords.filter((record) => {
    const matchesSearch =
      record.licenseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && record.status === "active"
    if (activeTab === "expired") return matchesSearch && record.status === "expired"
    if (activeTab === "pending") return matchesSearch && record.renewalStatus === "pending"

    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <h1 className="text-2xl font-bold tracking-tight">Trade License Management</h1>
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
            placeholder="Search by license ID, business name, or owner..."
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
          <Button onClick={() => router("/trade-license/new-application")}>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trade License Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Licenses</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="pending">Pending Renewal</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <TradeLicenseTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <TradeLicenseTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="expired" className="mt-4">
              <TradeLicenseTable records={filteredRecords} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <TradeLicenseTable records={filteredRecords} />
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
              <CardTitle className="text-base">Pay License Fee</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Make a payment for your trade license</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/trade-license/payment")}
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Proceed
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base">View License</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Download or print your trade license</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/trade-license/certificates")}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Licenses
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Renew License</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Apply for license renewal</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router("/trade-license/renew")}
              >
                <Search className="mr-2 h-4 w-4" />
                Renew
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

function TradeLicenseTable({ records }: { records: typeof tradeLicenseRecords }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>License ID</TableHead>
            <TableHead>Business Name</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="text-right">Annual Fee</TableHead>
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
                <TableCell className="font-medium">{record.licenseId}</TableCell>
                <TableCell>{record.businessName}</TableCell>
                <TableCell className="hidden md:table-cell">{record.owner}</TableCell>
                <TableCell className="hidden md:table-cell">{record.category}</TableCell>
                <TableCell className="text-right">₹{record.annualFee.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status === "active" ? "outline" : record.status === "expired" ? "destructive" : "secondary"
                    }
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => (window.location.href = `/trade-license/details/${record.id}`)}
                    >
                      View
                    </Button>
                    {record.renewalStatus !== "paid" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (window.location.href = `/trade-license/payment?id=${record.id}`)}
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

