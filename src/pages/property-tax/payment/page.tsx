"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recordRevenue } from "../../../../services/finance-integration"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

export default function PropertyTaxPayment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result:any = await recordRevenue({
        source: "property-tax",
        amount: Number.parseFloat(amount),
        transactionDate: new Date(),
        receiptNumber: `PT-${Date.now()}`,
        paidBy,
        collectedBy: "System User",
        paymentMode,
        accountHead: "110-01",
        fundCode: "municipal",
        departmentCode: "revenue",
        functionCode: "00",
        
      });

      if (result.success) {
        toast.success(`Payment Successful! Receipt No: ${result.transaction.receiptNumber}`); // ✅ Success toast
        navigate(`/property-tax/receipt/${result.transaction.id}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Payment Failed! There was an error processing your payment."); // ✅ Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer /> {/* ✅ Toast container to display notifications */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Property Tax Payment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property-id">Property ID</Label>
                <Input id="property-id" placeholder="Enter property ID" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paid-by">Paid By</Label>
                <Input id="paid-by" placeholder="Enter payer name" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required />
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
            <Button variant="outline" type="button" onClick={() => navigate(-1)}> {/* ✅ navigate(-1) for going back */}
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Make Payment"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
