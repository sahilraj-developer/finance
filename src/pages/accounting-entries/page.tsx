"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, FileText, Printer, Save, Plus, X, AlertCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for demonstration
const voucherTypes = [
  { value: "receipt", label: "Receipt Voucher" },
  { value: "payment", label: "Payment Voucher" },
  { value: "journal", label: "Journal Voucher" },
  { value: "contra", label: "Contra Voucher" },
]

const functionCodes = [
  { value: "00", label: "00 - General Administration" },
  { value: "10", label: "10 - Planning & Regulation" },
  { value: "20", label: "20 - Public Works" },
  { value: "30", label: "30 - Health & Sanitation" },
  { value: "40", label: "40 - Water Supply" },
  { value: "50", label: "50 - Public Institutions" },
  { value: "60", label: "60 - Urban Poverty Alleviation & Social Welfare" },
  { value: "70", label: "70 - Miscellaneous Services" },
  { value: "80", label: "80 - Finance, Accounts & Audit" },
]

const accountCodes = [
  { value: "110-01", label: "110-01 - Property Tax", type: "income" },
  { value: "110-02", label: "110-02 - Water Tax/User Charges", type: "income" },
  { value: "110-03", label: "110-03 - Advertisement Tax", type: "income" },
  { value: "110-04", label: "110-04 - License Fee", type: "income" },
  { value: "110-05", label: "110-05 - Rent from Municipal Properties", type: "income" },
  { value: "140-01", label: "140-01 - Assigned Revenues & Compensation", type: "income" },
  { value: "210-10", label: "210-10 - Salaries, Wages & Bonus", type: "expense" },
  { value: "210-20", label: "210-20 - Benefits & Allowances", type: "expense" },
  { value: "220-10", label: "220-10 - Office Maintenance", type: "expense" },
  { value: "230-10", label: "230-10 - Public Works", type: "expense" },
  { value: "230-20", label: "230-20 - Water Supply", type: "expense" },
  { value: "230-30", label: "230-30 - Public Health & Sanitation", type: "expense" },
  { value: "410-10", label: "410-10 - Cash in Hand", type: "asset" },
  { value: "411-10", label: "411-10 - Bank Accounts", type: "asset" },
  { value: "412-10", label: "412-10 - Investments", type: "asset" },
  { value: "431-10", label: "431-10 - Receivables from Property Tax", type: "asset" },
  { value: "431-20", label: "431-20 - Receivables from Water Tax", type: "asset" },
  { value: "450-10", label: "450-10 - Fixed Assets - Land", type: "asset" },
  { value: "450-20", label: "450-20 - Fixed Assets - Buildings", type: "asset" },
  { value: "450-30", label: "450-30 - Fixed Assets - Infrastructure Assets", type: "asset" },
  { value: "450-40", label: "450-40 - Fixed Assets - Plant & Machinery", type: "asset" },
  { value: "460-10", label: "460-10 - Accumulated Depreciation", type: "asset" },
  { value: "510-10", label: "510-10 - Secured Loans", type: "liability" },
  { value: "511-10", label: "511-10 - Unsecured Loans", type: "liability" },
  { value: "530-10", label: "530-10 - Sundry Creditors/Payables", type: "liability" },
  { value: "540-10", label: "540-10 - Deposits Received", type: "liability" },
  { value: "550-10", label: "550-10 - Other Liabilities", type: "liability" },
  { value: "310-10", label: "310-10 - Municipal Fund", type: "equity" },
  { value: "320-10", label: "320-10 - Earmarked Funds", type: "equity" },
  { value: "330-10", label: "330-10 - Reserves", type: "equity" },
]

export default function AccountingEntries() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedVoucherType, setSelectedVoucherType] = useState("")
  const [selectedFunctionCode, setSelectedFunctionCode] = useState("")
  const [debitEntries, setDebitEntries] = useState<any>([{ id: 1, accountCode: "", accountName: "", amount: 0 }])
  const [creditEntries, setCreditEntries] = useState<any>([{ id: 1, accountCode: "", accountName: "", amount: 0 }])

  // Calculate totals
  const totalDebit = debitEntries.reduce((sum:number, entry:any) => sum + (Number.parseFloat(entry.amount.toString()) || 0), 0)
  const totalCredit = creditEntries.reduce((sum:number, entry:any) => sum + (Number.parseFloat(entry.amount.toString()) || 0), 0)
  const isBalanced = totalDebit === totalCredit && totalDebit > 0

  // Add debit entry
  const addDebitEntry = () => {
    const newId = debitEntries.length > 0 ? Math.max(...debitEntries.map((entry:any) => entry.id)) + 1 : 1
    setDebitEntries([...debitEntries, { id: newId, accountCode: "", accountName: "", amount: 0 }])
  }

  // Remove debit entry
  const removeDebitEntry = (id: number) => {
    if (debitEntries.length > 1) {
      setDebitEntries(debitEntries.filter((entry:any) => entry.id !== id))
    }
  }

  // Add credit entry
  const addCreditEntry = () => {
    const newId = creditEntries.length > 0 ? Math.max(...creditEntries.map((entry:any) => entry.id)) + 1 : 1
    setCreditEntries([...creditEntries, { id: newId, accountCode: "", accountName: "", amount: 0 }])
  }

  // Remove credit entry
  const removeCreditEntry = (id: number) => {
    if (creditEntries.length > 1) {
      setCreditEntries(creditEntries.filter((entry:any) => entry.id !== id))
    }
  }

  // Update debit entry
  const updateDebitEntry = (id: number, field: string, value: string | number) => {
    setDebitEntries(
      debitEntries.map((entry:any) => {
        if (entry.id === id) {
          if (field === "accountCode") {
            const selectedAccount = accountCodes.find((acc) => acc.value === value)
            return {
              ...entry,
              [field]: value,
              accountName: selectedAccount ? selectedAccount.label.split(" - ")[1] : "",
            }
          }
          return { ...entry, [field]: value }
        }
        return entry
      }),
    )
  }

  // Update credit entry
  const updateCreditEntry = (id: number, field: string, value: string | number) => {
    setCreditEntries(
      creditEntries.map((entry:any) => {
        if (entry.id === id) {
          if (field === "accountCode") {
            const selectedAccount = accountCodes.find((acc) => acc.value === value)
            return {
              ...entry,
              [field]: value,
              accountName: selectedAccount ? selectedAccount.label.split(" - ")[1] : "",
            }
          }
          return { ...entry, [field]: value }
        }
        return entry
      }),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Accounting Entries - Ranchi Municipal Corporation (Form GEN-2)
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Journal Voucher Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voucher-type">Voucher Type</Label>
              <Select value={selectedVoucherType} onValueChange={setSelectedVoucherType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select voucher type" />
                </SelectTrigger>
                <SelectContent>
                  {voucherTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voucher-no">Voucher Number</Label>
              <Input id="voucher-no" placeholder="Auto-generated" readOnly className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry-date">Entry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference-no">Reference Number</Label>
              <Input id="reference-no" placeholder="Enter reference number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="function-code">Function Code</Label>
              <Select value={selectedFunctionCode} onValueChange={setSelectedFunctionCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select function code" />
                </SelectTrigger>
                <SelectContent>
                  {functionCodes.map((code) => (
                    <SelectItem key={code.value} value={code.value}>
                      {code.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="narration">Narration</Label>
            <Input id="narration" placeholder="Enter narration/description" />
          </div>

          {/* Debit Entries */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Debit Entries</Label>
              <Button variant="outline" size="sm" onClick={addDebitEntry}>
                <Plus className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Account Code</TableHead>
                  <TableHead className="w-[40%]">Account Name</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {debitEntries.map((entry:any) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Select
                        value={entry.accountCode.toString()}
                        onValueChange={(value) => updateDebitEntry(entry.id, "accountCode", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account code" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input value={entry.accountName} readOnly className="bg-muted" />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.amount}
                        onChange={(e) => updateDebitEntry(entry.id, "amount", Number.parseFloat(e.target.value) || 0)}
                        className="text-right"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDebitEntry(entry.id)}
                        disabled={debitEntries.length <= 1}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={2} className="font-bold">
                    Total Debit
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{totalDebit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Credit Entries */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Credit Entries</Label>
              <Button variant="outline" size="sm" onClick={addCreditEntry}>
                <Plus className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Account Code</TableHead>
                  <TableHead className="w-[40%]">Account Name</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditEntries.map((entry:any) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Select
                        value={entry.accountCode.toString()}
                        onValueChange={(value) => updateCreditEntry(entry.id, "accountCode", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account code" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input value={entry.accountName} readOnly className="bg-muted" />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.amount}
                        onChange={(e) => updateCreditEntry(entry.id, "amount", Number.parseFloat(e.target.value) || 0)}
                        className="text-right"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCreditEntry(entry.id)}
                        disabled={creditEntries.length <= 1}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={2} className="font-bold">
                    Total Credit
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{totalCredit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Balance Check */}
          <Card className="bg-muted/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Balance Check</h3>
                  <p className="text-sm text-muted-foreground">Total Debit must equal Total Credit</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Difference</div>
                  <div
                    className={`text-lg font-bold ${totalDebit === totalCredit ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    ₹
                    {Math.abs(totalDebit - totalCredit).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-xs text-muted-foreground mt-2">
            As per JMAM Rule 3.2: All accounting entries must follow the double-entry system with equal debits and
            credits
          </div>

          {/* Validation Alert */}
          {!isBalanced && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Entry Validation Failed</AlertTitle>
              <AlertDescription>
                The total debit amount must equal the total credit amount. Please adjust your entries.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="flex gap-2">
            <Button variant="outline">Clear</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Journal Voucher
            </Button>
            <Button disabled={!isBalanced}>Post Entry</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

