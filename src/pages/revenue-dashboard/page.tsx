"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, BarChart3, PieChart } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import type {
  RevenueSource,
  RevenueTransaction,
} from "../../../services/finance-integration";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Sample data for demonstration
const sampleTransactions: RevenueTransaction[] = [
  {
    id: "TXN-001",
    source: "property-tax",
    amount: 25000,
    transactionDate: new Date("2023-04-01"),
    receiptNumber: "PT-001",
    paidBy: "Ramesh Kumar",
    collectedBy: "System User",
    paymentMode: "cash",
    accountHead: "110-01",
    fundCode: "municipal",
    departmentCode: "revenue",
    functionCode: "00",
    status: "completed",
  },
  {
    id: "TXN-002",
    source: "water-tax",
    amount: 5000,
    transactionDate: new Date("2023-04-01"),
    receiptNumber: "WT-001",
    paidBy: "Suresh Patel",
    collectedBy: "System User",
    paymentMode: "online",
    accountHead: "110-02",
    fundCode: "water",
    departmentCode: "revenue",
    functionCode: "40",
    status: "completed",
  },
  {
    id: "TXN-003",
    source: "trade-license",
    amount: 15000,
    transactionDate: new Date("2023-04-02"),
    receiptNumber: "TL-001",
    paidBy: "Mahesh Traders",
    collectedBy: "System User",
    paymentMode: "cheque",
    accountHead: "110-04",
    fundCode: "municipal",
    departmentCode: "revenue",
    functionCode: "10",
    status: "completed",
  },
  {
    id: "TXN-004",
    source: "building-permit",
    amount: 50000,
    transactionDate: new Date("2023-04-03"),
    receiptNumber: "BP-001",
    paidBy: "Sharma Constructions",
    collectedBy: "System User",
    paymentMode: "online",
    accountHead: "110-06",
    fundCode: "municipal",
    departmentCode: "revenue",
    functionCode: "10",
    status: "completed",
  },
  {
    id: "TXN-005",
    source: "advertisement-tax",
    amount: 8000,
    transactionDate: new Date("2023-04-04"),
    receiptNumber: "AT-001",
    paidBy: "City Advertisers",
    collectedBy: "System User",
    paymentMode: "upi",
    accountHead: "110-03",
    fundCode: "municipal",
    departmentCode: "revenue",
    functionCode: "00",
    status: "completed",
  },
];

// Source display names
const sourceDisplayNames: Record<RevenueSource, string> = {
  "property-tax": "Property Tax",
  "water-tax": "Water Tax",
  "trade-license": "Trade License",
  "building-permit": "Building Permit",
  "advertisement-tax": "Advertisement Tax",
  "rental-income": "Rental Income",
  "user-charges": "User Charges",
};

// api
// /getall

// /post-data -

// {
//   "source": "string",           
//   "amount": "number",            
//   "transactionDate": "string",   
//   "receiptNumber": "string",     
//   "paidBy": "string",
//   "collectedBy": "string",       
//   "paymentMode": "string",       
//   "accountHead": "string",       
//   "fundCode": "string",          
//   "departmentCode": "string",   
//   "functionCode": "string",      
//   "status": "string"            
// }


export default function RevenueDashboard() {
  const [period, setPeriod] = useState("current-month");
  const [transactions, setTransactions] = useState<RevenueTransaction[]>([]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setTransactions(sampleTransactions);
  }, []);

  // Calculate totals by source
  const revenueBySource = transactions.reduce((acc, transaction) => {
    const source = transaction.source;
    if (!acc[source]) {
      acc[source] = 0;
    }
    acc[source] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate total revenue
  const totalRevenue = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Prepare chart data
  const barChartData = {
    labels: Object.keys(revenueBySource).map(
      (source) => sourceDisplayNames[source as RevenueSource]
    ),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(revenueBySource),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(revenueBySource).map(
      (source) => sourceDisplayNames[source as RevenueSource]
    ),
    datasets: [
      {
        data: Object.values(revenueBySource),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Revenue Dashboard</h1>
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

      <div className="flex items-center gap-4">
        <div className="grid gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="previous-month">Previous Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="current-year">
                Current Financial Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>

        {Object.entries(revenueBySource)
          .slice(0, 3)
          .map(([source, amount]) => (
            <Card key={source}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {sourceDisplayNames[source as RevenueSource]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{amount.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((amount / totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Paid By</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.receiptNumber}
                      </TableCell>
                      <TableCell>
                        {transaction.transactionDate.toLocaleDateString(
                          "en-IN"
                        )}
                      </TableCell>
                      <TableCell>
                        {sourceDisplayNames[transaction.source]}
                      </TableCell>
                      <TableCell>{transaction.paidBy}</TableCell>
                      <TableCell className="capitalize">
                        {transaction.paymentMode}
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Revenue by Source</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Revenue Distribution</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Pie
                    data={pieChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
