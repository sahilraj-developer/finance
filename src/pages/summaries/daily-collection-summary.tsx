"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CalendarIcon, Printer } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CollectionEntry {
  id: string
  receiptNumber: string
  collectionHead: string
  subHead: string
  amount: number
  paymentMode: string
  collectedBy: string
  bankDepositReference: string | null
}

export default function DailyCollectionSummary() {
  const [date, setDate] = useState<Date>(new Date())

  // Sample data - in a real app, this would be fetched based on the selected date
  const collections: CollectionEntry[] = [
    {
      id: "1",
      receiptNumber: "REC-2023-0125",
      collectionHead: "Property Tax",
      subHead: "Residential",
      amount: 25000,
      paymentMode: "Check",
      collectedBy: "Tax Clerk 1",
      bankDepositReference: "DEP-2023-001",
    },
    {
      id: "2",
      receiptNumber: "REC-2023-0126",
      collectionHead: "Property Tax",
      subHead: "Commercial",
      amount: 45000,
      paymentMode: "Bank Transfer",
      collectedBy: "Tax Clerk 2",
      bankDepositReference: "DEP-2023-001",
    },
    {
      id: "3",
      receiptNumber: "REC-2023-0127",
      collectionHead: "Water Charges",
      subHead: "Residential",
      amount: 12500,
      paymentMode: "Cash",
      collectedBy: "Utility Clerk 1",
      bankDepositReference: "DEP-2023-002",
    },
    {
      id: "4",
      receiptNumber: "REC-2023-0128",
      collectionHead: "Building Permit",
      subHead: "New Construction",
      amount: 35000,
      paymentMode: "Check",
      collectedBy: "Building Dept Clerk",
      bankDepositReference: "DEP-2023-003",
    },
    {
      id: "5",
      receiptNumber: "REC-2023-0129",
      collectionHead: "Business License",
      subHead: "Renewal",
      amount: 8500,
      paymentMode: "Online",
      collectedBy: "License Clerk",
      bankDepositReference: null,
    },
  ]

  // Calculate summary by collection head
  const collectionSummary = collections.reduce(
    (acc, entry) => {
      const head = entry.collectionHead
      if (!acc[head]) {
        acc[head] = 0
      }
      acc[head] += entry.amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate summary by payment mode
  const paymentModeSummary = collections.reduce(
    (acc, entry) => {
      const mode = entry.paymentMode
      if (!acc[mode]) {
        acc[mode] = 0
      }
      acc[mode] += entry.amount
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate total collection
  const totalCollection = collections.reduce((sum, entry) => sum + entry.amount, 0)

  // Calculate deposited and pending deposit amounts
  const depositedAmount = collections
    .filter((entry) => entry.bankDepositReference)
    .reduce((sum, entry) => sum + entry.amount, 0)

  const pendingDepositAmount = totalCollection - depositedAmount

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary of Daily Collection</CardTitle>
            <CardDescription>Summary of all revenue collected on {format(date, "MMMM d, yyyy")}</CardDescription>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Collection</div>
              <div className="text-2xl font-bold">
                {totalCollection.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Deposited</div>
              <div className="text-2xl font-bold">
                {depositedAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Pending Deposit</div>
              <div className={cn("text-2xl font-bold", pendingDepositAmount > 0 ? "text-amber-600" : "")}>
                {pendingDepositAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collection by Revenue Head</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Revenue Head</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(collectionSummary).map(([head, amount]) => (
                    <TableRow key={head}>
                      <TableCell>{head}</TableCell>
                      <TableCell className="text-right">
                        {amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">{((amount / totalCollection) * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {totalCollection.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right font-bold">100.00%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collection by Payment Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(paymentModeSummary).map(([mode, amount]) => (
                    <TableRow key={mode}>
                      <TableCell>{mode}</TableCell>
                      <TableCell className="text-right">
                        {amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">{((amount / totalCollection) * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {totalCollection.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right font-bold">100.00%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Collection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Collection Head</TableHead>
                    <TableHead>Sub-Head</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Collected By</TableHead>
                    <TableHead>Bank Deposit Ref.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collections.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.receiptNumber}</TableCell>
                      <TableCell>{entry.collectionHead}</TableCell>
                      <TableCell>{entry.subHead}</TableCell>
                      <TableCell className="text-right">
                        {entry.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell>{entry.paymentMode}</TableCell>
                      <TableCell>{entry.collectedBy}</TableCell>
                      <TableCell>{entry.bankDepositReference || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
