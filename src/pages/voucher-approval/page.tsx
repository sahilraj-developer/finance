"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Download, Eye, FileText, Printer, Search, ThumbsDown, ThumbsUp, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample data for demonstration
const pendingVouchers = [
  {
    id: "PV001",
    date: "2023-04-01",
    type: "Payment",
    description: "Vendor Payment - ABC Suppliers",
    amount: 25000,
    submittedBy: "Rajesh Kumar",
    status: "pending",
  },
  {
    id: "RV002",
    date: "2023-04-01",
    type: "Receipt",
    description: "Property Tax Collection - Ward 5",
    amount: 15000,
    submittedBy: "Suresh Patel",
    status: "pending",
  },
  {
    id: "JV003",
    date: "2023-04-02",
    type: "Journal",
    description: "Depreciation Entry - Q1",
    amount: 50000,
    submittedBy: "Priya Sharma",
    status: "pending",
  },
  {
    id: "CV004",
    date: "2023-04-03",
    type: "Contra",
    description: "Fund Transfer - SBI to BOB",
    amount: 100000,
    submittedBy: "Amit Verma",
    status: "pending",
  },
]

const approvedVouchers = [
  {
    id: "PV005",
    date: "2023-03-28",
    type: "Payment",
    description: "Salary Payment - March 2023",
    amount: 350000,
    submittedBy: "Rajesh Kumar",
    approvedBy: "Sanjay Gupta",
    status: "approved",
  },
  {
    id: "RV006",
    date: "2023-03-29",
    type: "Receipt",
    description: "Water Tax Collection - Ward 3",
    amount: 22000,
    submittedBy: "Suresh Patel",
    approvedBy: "Sanjay Gupta",
    status: "approved",
  },
]

const rejectedVouchers = [
  {
    id: "PV007",
    date: "2023-03-30",
    type: "Payment",
    description: "Office Supplies - XYZ Stationers",
    amount: 8500,
    submittedBy: "Rajesh Kumar",
    rejectedBy: "Sanjay Gupta",
    reason: "Insufficient documentation",
    status: "rejected",
  },
]

export default function VoucherApproval() {


  // get 

  // api/vouchers?status=pending
  
  // api/vouchers?status=approved
  
  // api/vouchers?status=rejected



  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  // Filter vouchers based on search term
  const filteredPendingVouchers = pendingVouchers.filter(
    (voucher) =>
      voucher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleApprove = () => {
    // Here you would normally update the voucher status in your backend
    console.log("Approved voucher:", selectedVoucher)
    setApprovalDialogOpen(false)
  }

  const handleReject = () => {
    // Here you would normally update the voucher status in your backend
    console.log("Rejected voucher:", selectedVoucher, "Reason:", rejectionReason)
    setRejectionDialogOpen(false)
    setRejectionReason("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Voucher Approval</h1>
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

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search vouchers..."
          className="pl-8 w-full md:w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval ({pendingVouchers.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedVouchers.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedVouchers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Vouchers Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voucher No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendingVouchers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No pending vouchers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPendingVouchers.map((voucher) => (
                      <TableRow key={voucher.id}>
                        <TableCell className="font-medium">{voucher.id}</TableCell>
                        <TableCell>{voucher.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{voucher.type}</Badge>
                        </TableCell>
                        <TableCell>{voucher.description}</TableCell>
                        <TableCell className="text-right">{voucher.amount.toLocaleString("en-IN")}</TableCell>
                        <TableCell>{voucher.submittedBy}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                                  onClick={() => setSelectedVoucher(voucher)}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  <span className="sr-only">Approve</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Approve Voucher</DialogTitle>
                                  <DialogDescription>Are you sure you want to approve this voucher?</DialogDescription>
                                </DialogHeader>
                                {selectedVoucher && (
                                  <div className="py-4">
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                      <div className="text-sm font-medium">Voucher No:</div>
                                      <div>{selectedVoucher.id}</div>
                                      <div className="text-sm font-medium">Description:</div>
                                      <div>{selectedVoucher.description}</div>
                                      <div className="text-sm font-medium">Amount:</div>
                                      <div>₹{selectedVoucher.amount.toLocaleString("en-IN")}</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      By approving this voucher, you confirm that all details are correct and the
                                      transaction is authorized.
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setApprovalDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleApprove}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                  onClick={() => setSelectedVoucher(voucher)}
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                  <span className="sr-only">Reject</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Voucher</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this voucher.
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedVoucher && (
                                  <div className="py-4">
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                      <div className="text-sm font-medium">Voucher No:</div>
                                      <div>{selectedVoucher.id}</div>
                                      <div className="text-sm font-medium">Description:</div>
                                      <div>{selectedVoucher.description}</div>
                                      <div className="text-sm font-medium">Amount:</div>
                                      <div>₹{selectedVoucher.amount.toLocaleString("en-IN")}</div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                                      <Textarea
                                        id="rejection-reason"
                                        placeholder="Enter reason for rejection"
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                    disabled={!rejectionReason.trim()}
                                  >
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Approved Vouchers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voucher No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedVouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell className="font-medium">{voucher.id}</TableCell>
                      <TableCell>{voucher.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{voucher.type}</Badge>
                      </TableCell>
                      <TableCell>{voucher.description}</TableCell>
                      <TableCell className="text-right">{voucher.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{voucher.submittedBy}</TableCell>
                      <TableCell>{voucher.approvedBy}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Rejected Vouchers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voucher No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Rejected By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejectedVouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell className="font-medium">{voucher.id}</TableCell>
                      <TableCell>{voucher.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{voucher.type}</Badge>
                      </TableCell>
                      <TableCell>{voucher.description}</TableCell>
                      <TableCell className="text-right">{voucher.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{voucher.submittedBy}</TableCell>
                      <TableCell>{voucher.rejectedBy}</TableCell>
                      <TableCell>{voucher.reason}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground mt-2">
        As per JMAM Rule 5.3: All vouchers must be approved by an authorized officer before processing
      </div>
    </div>
  )
}

