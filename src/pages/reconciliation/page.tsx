"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, ArrowDown, ArrowUp, Check, Download, Printer, X, Plus, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { format } from "date-fns"

// Sample data for demonstration
const cashReconciliation = {
  bookBalance: 18453,
  physicalCount: 18453,
  difference: 0,
  status: "reconciled",
  lastReconciled: "2023-04-01",
  items: [],
}

const bankReconciliation = {
  bookBalance: 32987.3,
  bankBalance: 35487.3,
  difference: 2500,
  status: "unreconciled",
  lastReconciled: "2023-03-25",
  items: [
    {
      id: 1,
      date: "2023-03-28",
      description: "Cheque issued but not presented",
      amount: 2500,
      type: "add",
      status: "pending",
    },
    {
      id: 2,
      date: "2023-03-30",
      description: "Bank charges not recorded in books",
      amount: 150,
      type: "subtract",
      status: "pending",
    },
    {
      id: 3,
      date: "2023-03-31",
      description: "Direct deposit not recorded in books",
      amount: 150,
      type: "add",
      status: "pending",
    },
  ],
}

export default function Reconciliation() {
  const [reconciliationType, setReconciliationType] = useState("bank")
  const [isClient, setIsClient] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [itemDate, setItemDate] = useState<Date | undefined>(new Date())

  // Use useEffect to ensure we're running on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Return null on server-side to prevent hydration mismatch
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Reconciliation Screens</h1>
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

      <Tabs value={reconciliationType} onValueChange={setReconciliationType} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="cash">Cash Reconciliation (Rule 18.4)</TabsTrigger>
          <TabsTrigger value="bank">Bank Reconciliation (Rule 19.6)</TabsTrigger>
        </TabsList>

        {/* Cash Reconciliation */}
        <TabsContent value="cash" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Book vs Physical Cash Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Balance */}
                <Card>
                  <CardHeader className="bg-muted/40">
                    <CardTitle className="text-lg">Cash Book Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">₹{cashReconciliation.bookBalance.toLocaleString("en-IN")}</div>
                    <p className="text-sm text-muted-foreground mt-2">As per Cash Book (GEN-1)</p>
                  </CardContent>
                </Card>

                {/* Physical Count */}
                <Card>
                  <CardHeader className="bg-muted/40">
                    <CardTitle className="text-lg">Physical Cash Count</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">
                      ₹{cashReconciliation.physicalCount.toLocaleString("en-IN")}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">As per physical verification</p>
                  </CardContent>
                </Card>
              </div>

              {/* Reconciliation Status */}
              <div className="mt-6 p-4 border rounded-lg bg-muted/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">Difference</div>
                    <div className="text-sm text-muted-foreground">
                      Last reconciled on {cashReconciliation.lastReconciled}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">₹{cashReconciliation.difference.toLocaleString("en-IN")}</div>
                    <Badge
                      className={
                        cashReconciliation.status === "reconciled"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }
                    >
                      {cashReconciliation.status === "reconciled" ? (
                        <Check className="mr-1 h-3 w-3" />
                      ) : (
                        <X className="mr-1 h-3 w-3" />
                      )}
                      {cashReconciliation.status === "reconciled" ? "Reconciled" : "Unreconciled"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Denomination Details */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Denomination Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[2000, 500, 200, 100, 50, 20, 10, 5, 2, 1].map((value) => (
                    <div key={value} className="flex flex-col space-y-2">
                      <Label htmlFor={`denom-${value}`}>₹{value} Notes/Coins</Label>
                      <Input id={`denom-${value}`} type="number" min="0" placeholder="0" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Reset</Button>
              <Button>Verify & Reconcile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Bank Reconciliation */}
        <TabsContent value="bank" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Book vs Bank Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Balance */}
                <Card>
                  <CardHeader className="bg-muted/40">
                    <CardTitle className="text-lg">Bank Book Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">₹{bankReconciliation.bookBalance.toLocaleString("en-IN")}</div>
                    <p className="text-sm text-muted-foreground mt-2">As per Bank Book (GEN-1)</p>
                  </CardContent>
                </Card>

                {/* Bank Statement */}
                <Card>
                  <CardHeader className="bg-muted/40">
                    <CardTitle className="text-lg">Bank Statement Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">₹{bankReconciliation.bankBalance.toLocaleString("en-IN")}</div>
                    <p className="text-sm text-muted-foreground mt-2">As per bank statement</p>
                  </CardContent>
                </Card>
              </div>

              {/* Reconciliation Status */}
              <div className="mt-6 p-4 border rounded-lg bg-muted/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">Difference</div>
                    <div className="text-sm text-muted-foreground">
                      Last reconciled on {bankReconciliation.lastReconciled}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">₹{bankReconciliation.difference.toLocaleString("en-IN")}</div>
                    <Badge
                      className={
                        bankReconciliation.status === "reconciled"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }
                    >
                      {bankReconciliation.status === "reconciled" ? (
                        <Check className="mr-1 h-3 w-3" />
                      ) : (
                        <X className="mr-1 h-3 w-3" />
                      )}
                      {bankReconciliation.status === "reconciled" ? "Reconciled" : "Unreconciled"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Reconciliation Items */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Reconciliation Items</h3>
                  <Button size="sm" onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Reconciliation Required</AlertTitle>
                  <AlertDescription>
                    There are unreconciled items that need to be addressed. Review and approve the items below.
                  </AlertDescription>
                </Alert>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankReconciliation.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === "add" ? "outline" : "destructive"}>
                            {item.type === "add" ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDown className="mr-1 h-3 w-3" />
                            )}
                            {item.type === "add" ? "Add to Book Balance" : "Subtract from Book Balance"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{item.amount.toLocaleString("en-IN")}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "approved" ? "success" : "outline"}>
                            {item.status === "approved" ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* AI Suggestions */}
              <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                <h3 className="text-lg font-medium mb-2">AI-Suggested Matches</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The system has identified potential matches between bank statement and book entries.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <div>
                      <div className="font-medium">Bank Charge (₹150)</div>
                      <div className="text-sm text-muted-foreground">Appears in bank statement on 30/03/2023</div>
                    </div>
                    <Button size="sm">Accept Match</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                    <div>
                      <div className="font-medium">Direct Deposit (₹150)</div>
                      <div className="text-sm text-muted-foreground">Appears in bank statement on 31/03/2023</div>
                    </div>
                    <Button size="sm">Accept Match</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline">Reset</Button>
              <Button>Complete Reconciliation</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Item Dialog - Moved outside of the main content */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Reconciliation Item</DialogTitle>
            <DialogDescription>
              Add a new item to reconcile the difference between bank statement and book balance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {itemDate ? format(itemDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={itemDate} onSelect={setItemDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-type" className="text-right">
                Type
              </Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add to Book Balance</SelectItem>
                    <SelectItem value="subtract">Subtract from Book Balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Input id="item-description" placeholder="Enter description" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-amount" className="text-right">
                Amount (₹)
              </Label>
              <div className="col-span-3">
                <Input id="item-amount" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-reference" className="text-right">
                Reference
              </Label>
              <div className="col-span-3">
                <Input id="item-reference" placeholder="Cheque/Transaction number" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Reconciliation Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

