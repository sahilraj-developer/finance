"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Filter from "@/Components/Common/Filter/Filter";

const tableData = {
  i1: {
    title: "Schedule I-1: Tax Revenue (Code 110)",
    data: [
      { code: "110-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "110-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "110-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "110-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "110-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "110-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "110-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "110-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "110-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "110-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "110-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "110-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "110-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "110-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "110-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
    ]
  },
  i1a: {
    title: "Schedule I-1a: Remission and Refund of taxes ",
    data: [
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "110-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },

    ]
  },
  i2: {
    title: "Schedule I-2: Assigned Revenues & Compensation (Code 120)",
    data: [
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "120-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
    ]
  },
  i3: {
    title: "Schedule I-3: Rental Income from Municipal Properties (Code 130)",
    data: [
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "130-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },
  i4a: {
    title: "Schedule I-4a: Fees & User Charges - Function wise (Code 140)",
    data: [
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
    ]
  },
 
  i4b: {
    title: "Schedule I-4a: Fees & User Charges - Income Head wise (Code 140)",
    data: [
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "140-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "140-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "140-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
    ]
  },
  i5a: {
    title: "Schedule I-5a: Sale & Hire Charges - Function wise (Code 150)",
    data: [
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "150-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
    ]
  },
  i5b: {
    title: "Schedule I-5b: Sale & Hire Charges - Income Head wise (Code 150)",
    data: [
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "150-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
    ]
  },
  i6: {
    title: "Schedule I-6: Revenue Grants, Contributions & Subsidies (Code 160)",
    data: [
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "160-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },

  i7: {
    title: "Schedule I-7: Income from Investments - General Fund (Code 170)",
    data: [
      { code: "170-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "170-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "170-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "170-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "170-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "170-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "170-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "170-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "170-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "170-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "170-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "170-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
    ]
  },
  i8: {
    title: "Schedule I-8: Interest Earned (Code 171)",
    data: [
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "171-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
    ]
  },
  i9: {
    title: "Schedule I-9: Other Income (Code 180)",
    data: [
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "180-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
    ]
  },
  i10a: {
    title: "Schedule I-10a: Establishment Expenses - Function wise (Code 210)",
    data: [
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "210-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },
  i10b: {
    title: "Schedule I-10b: Establishment Expenses - Head wise (Code 210)",
    data: [
      { code: "210-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "210-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "210-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "210-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "210-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "210-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "210-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "210-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "210-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "210-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "210-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "210-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
    ]
  },
  i11a: {
    title: "Schedule I-11a: Administrative Expenses - Function wise (Code 220)",
    data: [
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "220-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
    ]
  },
  i11b: {
    title: "Schedule I-11b: Administrative Expenses - Expenditure head-wise (Code 220)",
    data: [
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "220-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
    ]
  },
  i12a: {
    title: "Schedule I-12a: Operations & Maintenance Expenses - Function Wise (Code 230)",
    data: [
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "230-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },

    ]
  },

  i12b: {
    title: "Schedule I-12b: Operations & Maintenance - Expenditure head-wise (Code 230)",
    data: [
      { code: "230-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "230-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "230-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "230-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "230-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "230-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "230-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "230-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "230-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
      { code: "230-10", name: "Loans and advances to employees",  paid: 0,  balance: 0 },
      { code: "230-20", name: "Employee Provident Fund Loans",  paid: 0,  balance: 0 },
      { code: "230-40", name: "Advance to Suppliers and Contractors",  paid: 7688425,  balance: 7688425 },
    ]
  },
  i13: {
    title: "Schedule I-13: Interest & Finance Charges (Code 240)",
    data: [
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "240-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },

    ]
  },
  i14: {
    title: "Schedule I-14: Programme Expenses (Code 250)",
    data: [
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
      { code: "250-10", name: "Provision for Bad Debts",  paid: 0,  balance: 1200000 },
    ]
  },
  i15: {
    title: "Schedule I-15: Revenue Grants Contributions & Subsidies (Code 260)",
    data: [
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
      { code: "260-10", name: "Security Deposits",  paid: 50000,  balance: 550000 },
    ]
  },
  i16: {
    title: "Schedule I-16: Provisions & Write off (Code 270)",
    data: [
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "270-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },
  i17: {
    title: "Schedule I-17: Miscellaneous Expenses   (Code 271)",
    data: [
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "271-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },
  i18: {
    title: "Schedule I-18: Depreciation (Code 272)",
    data: [
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "272-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },
  i19: {
    title: "Schedule I-19: Priro Period Items (Net) (Code 280)",
    data: [
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
      { code: "280-10", name: "Preliminary Expenses",  paid: 20000,  balance: 320000 },
    ]
  },
 

};

export default function SchedularI() {
  const [activeTab, setActiveTab] = useState("loans");

  const getTotal = (key) => {
    return tableData[activeTab]?.data?.reduce((sum, row) => sum + row[key], 0)?.toLocaleString();
  };

  return (
    <div className="container mx-auto py-8  w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Schedule I Report</h1>

 {/* Dropdown Section */}
 <div className="flex justify-center mb-8">
      <div className="relative w-80">
        <select
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="loans" selected>
            Select a category
          </option>
          <option value="i1">Tax Revenue  I-1 </option>
          <option value="i1a">Remission and Refund of taxes I-1a </option>
          <option value="i2"> Assigned Revenues & Compensation I-2</option>
          <option value="i3">Rental Income from Municipal Properties I-3</option>
          <option value="i4a">Fees & User Charges - Function wise I-4a</option>
          <option value="i4b">Fees & User Charges - Income Head wise I-4b</option>
          <option value="i5a">Sale & Hire Charges - Function wise I-5a </option>
          <option value="i5b">Sale & Hire Charges - Income Head wise I-5b </option>
          <option value="i6">Revenue Grants, Contributions & Subsidies I-6</option>
          <option value="i7">Income from Investments - General Fund I-7</option>
          <option value="i8">Interest Earned  I-8</option>
          <option value="i9">Other Income I-9</option>
          <option value="i10a">Establishment Expenses - Function wise  I-10a</option>
          <option value="i10b">Establishment Expenses - Head wise   I-10b</option>
          <option value="i11a">Administrative Expenses - Function wise I-11a</option>
          <option value="i11b">Administrative Expenses - Expenditure head-wise I-11b</option>
          <option value="i12a">Operations & Maintenance Expenses - Function Wise I-12a</option>
          <option value="i12b">Operations & Maintenance - Expenditure head-wise I-12b</option>
          <option value="i13">Interest & Finance Charges  I-13</option>
          <option value="i14">Programme Expenses I-14</option>
          <option value="i15">Revenue Grants Contributions & Subsidies  I-15</option>
          <option value="i16">Provisions & Write off I-16</option>
          <option value="i17">Miscellaneous Expenses  I-17</option>
          <option value="i18">Depreciation  I-18</option>
          <option value="i19">Priro Period Items (Net)  I-19</option>
         
        </select>
      </div>
    </div>


      <Card className="w-full ">
        <CardHeader className="bg-slate-50">
          <CardTitle className="text-center text-lg font-semibold">
            {tableData[activeTab]?.title}
          </CardTitle>
        </CardHeader>


        
{/* Filters */}
      {/* <Filter/> */}

{/* Filters */}
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th rowSpan={2} className="border border-gray-300 p-2 text-center w-20">Code No.</th>
                <th rowSpan={2} className="border border-gray-300 p-2 text-center">Particulars</th>
                <th className="border border-gray-300 p-2 text-center">Current Year Amount</th>
                <th className="border border-gray-300 p-2 text-center">Previos Year Amount</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
                {/* <th className="border border-gray-300 p-2 text-center">(Rs.)</th> */}
                {/* <th className="border border-gray-300 p-2 text-center">(Rs.)</th> */}
              </tr>
            </thead>
            <tbody>
              {tableData[activeTab]?.data?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="border border-gray-300 p-2 text-center">{row?.code}</td>
                  <td className="border border-gray-300 p-2">{row?.name}</td>
                  <td className="border border-gray-300 p-2 text-right">{row?.paid?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{row?.balance?.toLocaleString()}</td>
                </tr>
              ))}

<tr className="bg-gray-100 font-bold">
  <td></td>
  <td></td>
<td className="border border-gray-300 p-2 text-right">{getTotal("paid")}</td>
<td></td>
</tr>

              {/* <tr className="bg-gray-100 font-bold">
                <td colSpan={2} className="border border-gray-300 p-2 text-right">Total</td>
                // <td className="border border-gray-300 p-2 text-right">{getTotal("opening")}</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("paid")}</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("recovered")}</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("balance")}</td>
              </tr> */}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
