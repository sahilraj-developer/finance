"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { recordRevenue } from "../../../../services/finance-integration"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"

export default function TradeLicensePayment() {
  const router = useNavigate()
  const [loading, setLoading] = useState(false)
  const [paymentMode, setPaymentMode] = useState("")
  const [licenseId, setLicenseId] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result:any = await recordRevenue({
        source: "trade-license",
        amount: Number.parseFloat(amount),
        transactionDate: new Date(),
        receiptNumber: `TL-${Date.now()}`,
        paidBy,
        collectedBy: "System User", // In a real app, this would be the logged-in user
        paymentMode,
        accountHead: "110-04", // License Fee account head
        fundCode: "municipal",
        departmentCode: "revenue",
        functionCode: "10",
      })

      if (result.success) {
        toast.success(`Payment Successful! Receipt: ${result.transaction.receiptNumber}`);
        router(`/trade-license/receipt/${result.transaction.id}`)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Payment Failed. There was an error processing your payment.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Trade License Fee Payment</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="license-id">License ID</Label>
                <Input
                  id="license-id"
                  placeholder="Enter license ID"
                  value={licenseId}
                  onChange={(e) => setLicenseId(e.target.value)}
                  required
                />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paid-by">Paid By</Label>
                <Input
                  id="paid-by"
                  placeholder="Enter payer name"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-mode">Payment Mode</Label>
                <Select value={paymentMode} onValueChange={setPaymentMode} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="online">Online Transfer</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {paymentMode === "cheque" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cheque-no">Cheque Number</Label>
                  <Input id="cheque-no" placeholder="Enter cheque number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" placeholder="Enter bank name" required />
                </div>
              </div>
            )}
            {(paymentMode === "online" || paymentMode === "upi") && (
              <div className="space-y-2">
                <Label htmlFor="transaction-id">Transaction ID</Label>
                <Input id="transaction-id" placeholder="Enter transaction ID" required />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" type="button" onClick={() => router(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Make Payment"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
