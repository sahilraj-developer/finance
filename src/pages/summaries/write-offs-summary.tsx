"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WriteOff {
  id: string
  writeOffNumber: string
  date: string
  category: string
  originalAmount: number
  writeOffAmount: number
  reason: string
  approvedBy: string
  approvalReference: string
}

export default function WriteOffsSummary() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  const [filterCategory, setFilterCategory] = useState<string>("all")

  // Sample data - in a real app, this would be fetched based on the selected date range
  const writeOffs: WriteOff[] = [
    {
      id: "1",
      writeOffNumber: "WO-2023-001",
      date: "2023-01-15",
      category: "Property Tax",
      originalAmount: 2500,
      writeOffAmount: 2500,
      reason: "Property destroyed in natural disaster",
      approvedBy: "Municipal Commissioner",
      approvalReference: "Council Resolution #2023-05",
    },
    {
      id: "2",
      writeOffNumber: "WO-2023-002",
      date: "2023-02-10",
      category: "Water Charges",
      originalAmount: 850,
      writeOffAmount: 850,
      reason: "Billing error - incorrect meter reading",
      approvedBy: "Utility Director",
      approvalReference: "Memo #UD-2023-15",
    },
    {
      id: "3",
      writeOffNumber: "WO-2023-003",
      date: "2023-03-05",
      category: "Business License Fee",
      originalAmount: 1200,
      writeOffAmount: 1200,
      reason: "Business closed due to bankruptcy",
      approvedBy: "Finance Director",
      approvalReference: "Finance Memo #2023-22",
    },
    {
      id: "4",
      writeOffNumber: "WO-2023-004",
      date: "2023-03-15",
      category: "Property Tax",
      originalAmount: 3500,
      writeOffAmount: 1750,
      reason: "Financial hardship - partial write-off",
      approvedBy: "Municipal Commissioner",
      approvalReference: "Council Resolution #2023-18",
    },
    {
      id: "5",
      writeOffNumber: "WO-2023-005",
      date: "2023-04-10",
      category: "Water Charges",
      originalAmount: 1200,
      writeOffAmount: 1200,
      reason: "Property vacant for over 6 months",
      approvedBy: "Utility Director",
      approvalReference: "Memo #UD-2023-28",
    },
  ]

  // Filter write-offs based on category
  const filteredWriteOffs =
    filterCategory === "all" ? writeOffs : writeOffs.filter((wo) => wo.category === filterCategory)

  // Calculate summary statistics
  const totalWriteOffs = filteredWriteOffs.length
  const totalOriginalAmount = filteredWriteOffs.reduce((sum, wo) => sum + wo.originalAmount, 0)
  const totalWriteOffAmount = filteredWriteOffs.reduce((sum, wo) => sum + wo.writeOffAmount, 0)

  // Get unique categories for filter
  const categories = Array.from(new Set(writeOffs.map((wo) => wo.category)))

  // Calculate summary by category
  const categorySummary = writeOffs.reduce(
    (acc, wo) => {
      const category = wo.category
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          originalAmount: 0,
          writeOffAmount: 0,
        }
      }
      acc[category].count += 1
      acc[category].originalAmount += wo.originalAmount
      acc[category].writeOffAmount += wo.writeOffAmount
      return acc
    },
    {} as Record<string, { count: number; originalAmount: number; writeOffAmount: number }>,
  )

  // Calculate monthly summary
  const monthlySummary = writeOffs.reduce(
    (acc, wo) => {
      const month = wo.date.substring(0, 7) // Extract YYYY-MM
      if (!acc[month]) {
        acc[month] = {
          count: 0,
          writeOffAmount: 0,
        }
      }
      acc[month].count += 1
      acc[month].writeOffAmount += wo.writeOffAmount
      return acc
    },
    {} as Record<string, { count: number; writeOffAmount: number }>,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Summary Statement of Write-offs</CardTitle>
            <CardDescription>Summary of all write-offs processed during the selected period</CardDescription>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <DateRangePicker value={dateRange} onValueChange={setDateRange} />
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
              <div className="text-sm font-medium text-muted-foreground">Total Write-offs</div>
              <div className="text-2xl font-bold">{totalWriteOffs}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Original Amount</div>
              <div className="text-2xl font-bold">
                {totalOriginalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">Write-off Amount</div>
              <div className="text-2xl font-bold">
                {totalWriteOffAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Write-offs by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Original Amount</TableHead>
                    <TableHead className="text-right">Write-off Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(categorySummary).map(([category, data]) => (
                    <TableRow key={category}>
                      <TableCell>{category}</TableCell>
                      <TableCell className="text-right">{data.count}</TableCell>
                      <TableCell className="text-right">
                        {data.originalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {data.writeOffAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">{writeOffs.length}</TableCell>
                    <TableCell className="text-right font-bold">
                      {writeOffs
                        .reduce((sum, wo) => sum + wo.originalAmount, 0)
                        .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {writeOffs
                        .reduce((sum, wo) => sum + wo.writeOffAmount, 0)
                        .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Write-offs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(monthlySummary).map(([month, data]) => {
                    const displayMonth = new Date(month + "-01").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                    return (
                      <TableRow key={month}>
                        <TableCell>{displayMonth}</TableCell>
                        <TableCell className="text-right">{data.count}</TableCell>
                        <TableCell className="text-right">
                          {data.writeOffAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </TableCell>
                        <TableCell className="text-right">
                          {((data.writeOffAmount / totalWriteOffAmount) * 100).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Write-off Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Write-off No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Original Amount</TableHead>
                    <TableHead className="text-right">Write-off Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Approval Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWriteOffs.map((wo) => (
                    <TableRow key={wo.id}>
                      <TableCell>{wo.writeOffNumber}</TableCell>
                      <TableCell>{wo.date}</TableCell>
                      <TableCell>{wo.category}</TableCell>
                      <TableCell className="text-right">
                        {wo.originalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell className="text-right">
                        {wo.writeOffAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </TableCell>
                      <TableCell>{wo.reason}</TableCell>
                      <TableCell>{wo.approvedBy}</TableCell>
                      <TableCell>{wo.approvalReference}</TableCell>
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
