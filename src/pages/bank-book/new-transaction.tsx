"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Save, ArrowLeft } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useNavigate } from "react-router-dom"

const transactionTypes = [
  { value: "deposit", label: "Deposit" },
  { value: "withdrawal", label: "Withdrawal" },
]

const bankAccounts = [
  { value: "sbi", label: "State Bank of India - 3245678901", balance: 1250000 },
  { value: "bob", label: "Bank of Baroda - 7865432109", balance: 780000 },
  { value: "pnb", label: "Punjab National Bank - 5643219876", balance: 450000 },
]

const paymentModes = [
  { value: "cheque", label: "Cheque" },
  { value: "rtgs", label: "RTGS/NEFT" },
  { value: "online", label: "Online Transfer" },
  { value: "cash", label: "Cash Deposit/Withdrawal" },
]

export default function NewBankTransaction() {
  const router = useNavigate()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [transactionType, setTransactionType] = useState<string>("deposit")
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [paymentMode, setPaymentMode] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the data to your backend
    // For now, we'll just navigate back to the bank book
    router("/bank-book")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">New Bank Transaction (Form GEN-1)</h1>
        <Button variant="outline" size="sm" onClick={() => router("/bank-book")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bank Book
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Enter Bank Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-date">Transaction Date</Label>
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

              <div className="space-y-2">
                <Label htmlFor="voucher-no">Voucher Number</Label>
                <Input id="voucher-no" placeholder="RMC/BB/2023-24/0001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-type">Transaction Type</Label>
                <RadioGroup value={transactionType} onValueChange={setTransactionType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deposit" id="deposit" />
                    <Label htmlFor="deposit" className="cursor-pointer">
                      Deposit
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="withdrawal" id="withdrawal" />
                    <Label htmlFor="withdrawal" className="cursor-pointer">
                      Withdrawal
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank-account">Bank Account</Label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankAccounts.map((account) => (
                      <SelectItem key={account.value} value={account.value}>
                        {account.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-mode">Payment Mode</Label>
                <Select value={paymentMode} onValueChange={setPaymentMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {paymentMode === "cheque" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cheque-no">Cheque Number</Label>
                  <Input id="cheque-no" placeholder="Enter cheque number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cheque-date">Cheque Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Select date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {(paymentMode === "rtgs" || paymentMode === "online") && (
              <div className="space-y-2">
                <Label htmlFor="transaction-id">Transaction ID/Reference Number</Label>
                <Input id="transaction-id" placeholder="Enter transaction ID" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-to">{transactionType === "deposit" ? "Received From" : "Paid To"}</Label>
                <Input
                  id="from-to"
                  placeholder={transactionType === "deposit" ? "Enter depositor name" : "Enter payee name"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter transaction details" className="min-h-[100px]" />
            </div>

            <div className="text-xs text-muted-foreground mt-2">
              As per JMAM Rule 2.2: All bank transactions must be recorded in the Bank Book with proper supporting
              documentation
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" type="button" onClick={() => router("/bank-book")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Transaction
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

