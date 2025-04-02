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
  { value: "receipt", label: "Receipt (Debit)" },
  { value: "payment", label: "Payment (Credit)" },
]

const receiptTypes = [
  { value: "tax", label: "Tax Collection" },
  { value: "fee", label: "Fee Collection" },
  { value: "license", label: "License Fee" },
  { value: "rent", label: "Rent from Municipal Properties" },
  { value: "grant", label: "Grant Receipt" },
  { value: "other", label: "Other Receipt" },
]

const paymentTypes = [
  { value: "salary", label: "Salary Payment" },
  { value: "vendor", label: "Vendor Payment" },
  { value: "utility", label: "Utility Payment" },
  { value: "maintenance", label: "Maintenance Expense" },
  { value: "advance", label: "Advance Payment" },
  { value: "other", label: "Other Payment" },
]

export default function NewCashbookEntry() {
  const router = useNavigate()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [transactionType, setTransactionType] = useState<string>("receipt")
  const [subType, setSubType] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the data to your backend
    // For now, we'll just navigate back to the cash book
    router("/cash-book")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">New Cash Book Entry (Form GEN-1)</h1>
        <Button variant="outline" size="sm" onClick={() => router("/cash-book")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cash Book
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Enter Cash Transaction Details</CardTitle>
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
                <Input id="voucher-no" placeholder="RMC/CB/2023-24/0001" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-type">Transaction Type</Label>
                <RadioGroup value={transactionType} onValueChange={setTransactionType} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="receipt" id="receipt" />
                    <Label htmlFor="receipt" className="cursor-pointer">
                      Receipt (Debit)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="payment" id="payment" />
                    <Label htmlFor="payment" className="cursor-pointer">
                      Payment (Credit)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sub-type">{transactionType === "receipt" ? "Receipt Type" : "Payment Type"}</Label>
                <Select value={subType} onValueChange={setSubType}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${transactionType} type`} />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionType === "receipt"
                      ? receiptTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))
                      : paymentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

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
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-to">{transactionType === "receipt" ? "Received From" : "Paid To"}</Label>
              <Input
                id="from-to"
                placeholder={transactionType === "receipt" ? "Enter payer name" : "Enter payee name"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter transaction details" className="min-h-[100px]" />
            </div>

            <div className="text-xs text-muted-foreground mt-2">
              As per JMAM Rule 2.1: All cash transactions must be recorded in the Cash Book on the same day they occur
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" type="button" onClick={() => router("/cash-book")}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Entry
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

