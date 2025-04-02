"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronRight, Download, Filter, Printer, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for demonstration
const accountGroups = [
  {
    id: "assets",
    name: "Assets",
    code: "100",
    type: "debit",
    accounts: [
      {
        id: "fixed-assets",
        name: "Fixed Assets",
        code: "110",
        openingBalance: 2500000,
        debit: 150000,
        credit: 50000,
        transactions: [
          {
            id: 1,
            date: "2023-04-01",
            voucherNo: "JV001",
            description: "Purchase of Office Equipment",
            debit: 150000,
            credit: 0,
          },
          { id: 2, date: "2023-04-15", voucherNo: "JV010", description: "Depreciation Entry", debit: 0, credit: 50000 },
        ],
      },
      {
        id: "current-assets",
        name: "Current Assets",
        code: "120",
        openingBalance: 1800000,
        debit: 450000,
        credit: 320000,
        transactions: [
          { id: 1, date: "2023-04-02", voucherNo: "RV001", description: "Tax Collection", debit: 250000, credit: 0 },
          {
            id: 2,
            date: "2023-04-10",
            voucherNo: "PV005",
            description: "Advance to Contractor",
            debit: 200000,
            credit: 0,
          },
          { id: 3, date: "2023-04-20", voucherNo: "PV012", description: "Payment to Vendor", debit: 0, credit: 320000 },
        ],
      },
    ],
  },
  {
    id: "liabilities",
    name: "Liabilities",
    code: "200",
    type: "credit",
    accounts: [
      {
        id: "long-term-liabilities",
        name: "Long Term Liabilities",
        code: "210",
        openingBalance: 1200000,
        debit: 100000,
        credit: 0,
        transactions: [
          { id: 1, date: "2023-04-05", voucherNo: "PV003", description: "Loan Repayment", debit: 100000, credit: 0 },
        ],
      },
      {
        id: "current-liabilities",
        name: "Current Liabilities",
        code: "220",
        openingBalance: 750000,
        debit: 200000,
        credit: 350000,
        transactions: [
          { id: 1, date: "2023-04-08", voucherNo: "PV004", description: "Vendor Payment", debit: 200000, credit: 0 },
          { id: 2, date: "2023-04-12", voucherNo: "JV008", description: "Accrued Expenses", debit: 0, credit: 150000 },
          {
            id: 3,
            date: "2023-04-25",
            voucherNo: "JV015",
            description: "Security Deposit Received",
            debit: 0,
            credit: 200000,
          },
        ],
      },
    ],
  },
  {
    id: "income",
    name: "Income",
    code: "300",
    type: "credit",
    accounts: [
      {
        id: "tax-revenue",
        name: "Tax Revenue",
        code: "310",
        openingBalance: 0,
        debit: 0,
        credit: 450000,
        transactions: [
          {
            id: 1,
            date: "2023-04-02",
            voucherNo: "RV001",
            description: "Property Tax Collection",
            debit: 0,
            credit: 250000,
          },
          {
            id: 2,
            date: "2023-04-18",
            voucherNo: "RV008",
            description: "Water Tax Collection",
            debit: 0,
            credit: 200000,
          },
        ],
      },
      {
        id: "non-tax-revenue",
        name: "Non-Tax Revenue",
        code: "320",
        openingBalance: 0,
        debit: 0,
        credit: 350000,
        transactions: [
          {
            id: 1,
            date: "2023-04-03",
            voucherNo: "RV002",
            description: "Rent from Municipal Properties",
            debit: 0,
            credit: 120000,
          },
          {
            id: 2,
            date: "2023-04-15",
            voucherNo: "RV007",
            description: "License Fee Collection",
            debit: 0,
            credit: 230000,
          },
        ],
      },
    ],
  },
  {
    id: "expenditure",
    name: "Expenditure",
    code: "400",
    type: "debit",
    accounts: [
      {
        id: "administrative-expenses",
        name: "Administrative Expenses",
        code: "410",
        openingBalance: 0,
        debit: 380000,
        credit: 0,
        transactions: [
          { id: 1, date: "2023-04-05", voucherNo: "PV003", description: "Salary Payment", debit: 250000, credit: 0 },
          { id: 2, date: "2023-04-12", voucherNo: "PV006", description: "Office Supplies", debit: 30000, credit: 0 },
          { id: 3, date: "2023-04-20", voucherNo: "PV010", description: "Utility Bills", debit: 100000, credit: 0 },
        ],
      },
      {
        id: "development-expenses",
        name: "Development Expenses",
        code: "420",
        openingBalance: 0,
        debit: 650000,
        credit: 0,
        transactions: [
          { id: 1, date: "2023-04-10", voucherNo: "PV005", description: "Road Maintenance", debit: 350000, credit: 0 },
          {
            id: 2,
            date: "2023-04-22",
            voucherNo: "PV011",
            description: "Public Health Services",
            debit: 300000,
            credit: 0,
          },
        ],
      },
    ],
  },
]

export default function GeneralLedger() {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const [expandedAccounts, setExpandedAccounts] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const toggleAccount = (accountId: string) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }))
  }

  // Filter accounts based on search term
  const filteredGroups = searchTerm
    ? accountGroups
        .map((group) => ({
          ...group,
          accounts: group.accounts.filter(
            (account) =>
              account.name.toLowerCase().includes(searchTerm.toLowerCase()) || account.code.includes(searchTerm),
          ),
        }))
        .filter((group) => group.accounts.length > 0)
    : accountGroups

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">General Ledger (GEN-3 Form)</h1>
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

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by account name or code..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chart of Accounts (Rule 16)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Account Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Opening Balance</TableHead>
                  <TableHead>Debit</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead>Closing Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <>
                    <TableRow
                      key={group.id}
                      className="bg-muted/50 hover:bg-muted cursor-pointer"
                      onClick={() => toggleGroup(group.id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {expandedGroups[group.id] ? (
                            <ChevronDown className="mr-2 h-4 w-4" />
                          ) : (
                            <ChevronRight className="mr-2 h-4 w-4" />
                          )}
                          {group.name}
                        </div>
                      </TableCell>
                      <TableCell>{group.code}</TableCell>
                      <TableCell>
                        {group.accounts
                          .reduce((sum, account) => sum + account.openingBalance, 0)
                          .toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        {group.accounts.reduce((sum, account) => sum + account.debit, 0).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        {group.accounts.reduce((sum, account) => sum + account.credit, 0).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {(
                          group.accounts.reduce((sum, account) => sum + account.openingBalance, 0) +
                          (group.type === "debit" ? 1 : -1) *
                            (group.accounts.reduce((sum, account) => sum + account.debit, 0) -
                              group.accounts.reduce((sum, account) => sum + account.credit, 0))
                        ).toLocaleString("en-IN")}
                      </TableCell>
                    </TableRow>

                    {expandedGroups[group.id] &&
                      group.accounts.map((account) => (
                        <>
                          <TableRow
                            key={account.id}
                            className="hover:bg-muted/30 cursor-pointer"
                            onClick={() => toggleAccount(account.id)}
                          >
                            <TableCell className="pl-8">
                              <div className="flex items-center">
                                {expandedAccounts[account.id] ? (
                                  <ChevronDown className="mr-2 h-4 w-4" />
                                ) : (
                                  <ChevronRight className="mr-2 h-4 w-4" />
                                )}
                                {account.name}
                              </div>
                            </TableCell>
                            <TableCell>{account.code}</TableCell>
                            <TableCell>{account.openingBalance.toLocaleString("en-IN")}</TableCell>
                            <TableCell>{account.debit.toLocaleString("en-IN")}</TableCell>
                            <TableCell>{account.credit.toLocaleString("en-IN")}</TableCell>
                            <TableCell className="font-medium">
                              {(
                                account.openingBalance +
                                (group.type === "debit" ? 1 : -1) * (account.debit - account.credit)
                              ).toLocaleString("en-IN")}
                            </TableCell>
                          </TableRow>

                          {expandedAccounts[account.id] &&
                            account.transactions.map((transaction) => (
                              <TableRow key={transaction.id} className="bg-muted/10">
                                <TableCell className="pl-12">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                      {new Date(transaction.date).toLocaleDateString("en-IN")}
                                    </span>
                                    <Badge variant="outline" className="ml-2">
                                      {transaction.voucherNo}
                                    </Badge>
                                    {transaction.description}
                                  </div>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                  {transaction.debit > 0 ? transaction.debit.toLocaleString("en-IN") : ""}
                                </TableCell>
                                <TableCell>
                                  {transaction.credit > 0 ? transaction.credit.toLocaleString("en-IN") : ""}
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            ))}
                        </>
                      ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

