"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Filter from "@/Components/Common/Filter/Filter";

const tableData = {
  b1: {
    title: "Schedule B-1: Municipal (General) Fund (Code 310)",
    data: [
      { code: "310-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "310-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "310-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "310-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "310-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "310-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
    ]
  },
  b2: {
    title: "Schedule B-2: Earmarked Funds (Code 311)",
    data: [
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "311-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },

    ]
  },
  b3: {
    title: "Schedule B-3: Reserves (Code 312)",
    data: [
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "312-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
    ]
  },
  b4: {
    title: "Schedule B-4: Grants & Condition for Specific Purposes (Code 320)",
    data: [
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "320-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
    ]
  },
  b5: {
    title: "Schedule B-5: Secured Loans (Code 330)",
    data: [
      { code: "330-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "330-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "330-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "330-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "330-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "330-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
    ]
  },
  b6: {
    title: "Schedule B-6: Unsecured Loans (Code 331)",
    data: [
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "331-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
    ]
  },
  b7: {
    title: "Schedule B-7: Deposits Received (Code 340)",
    data: [
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "340-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
    ]
  },
  b8: {
    title: "Schedule B-8: Deposits Works (Code 341)",
    data: [
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "341-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
    ]
  },

  b9: {
    title: "Schedule B-9: Other Liabilites (Sundry Creditors) (Code 350)",
    data: [
      { code: "460-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "460-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "460-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "460-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "460-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
    ]
  },
  b10: {
    title: "Schedule B-10: Provisions (Code 360)",
    data: [
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
    ]
  },
  b11: {
    title: "Schedule B-11: Fixed Assets (Code 410 & 411)",
    data: [
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "410-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
    ]
  },
  b12: {
    title: "Schedule B-12: Investments - General Funds (Code 420)",
    data: [
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "420-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
    ]
  },
  b13: {
    title: "Schedule B-13: Investments - Other Funds (Code 421)",
    data: [
      { code: "421-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "421-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "421-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "421-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "421-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
    ]
  },
  b14: {
    title: "Schedule B-14: Stock in Hand (Incentories) (Code 430)",
    data: [
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "430-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
    ]
  },
  b15: {
    title: "Schedule B-15: Sundry Debtors (Receivables) (Code 431)",
    data: [
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "431-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
    ]
  },
  b16: {
    title: "Schedule B-16: Prepaid Expenses (Code 440)",
    data: [
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "440-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },

    ]
  },

  b17: {
    title: "Schedule B-17: Cash and Bank Balances (Code 450)",
    data: [
      { code: "450-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "450-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "450-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
      { code: "450-10", name: "Loans and advances to employees", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-20", name: "Employee Provident Fund Loans", opening: 0, paid: 0, recovered: 0, balance: 0 },
      { code: "450-40", name: "Advance to Suppliers and Contractors", opening: 0, paid: 7688425, recovered: 0, balance: 7688425 },
    ]
  },
  b18: {
    title: "Schedule B-18: Loans , Advances and deposits (Code 460)",
    data: [
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },

    ]
  },
  b18a: {
    title: "Schedule B-18-a: Accumulated Provisions against Loans, Advances, and Deposits (Code 461)",
    data: [
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
      { code: "461-10", name: "Provision for Bad Debts", opening: 1200000, paid: 0, recovered: 0, balance: 1200000 },
    ]
  },
  b19: {
    title: "Schedule B-19: Other Assets (Code 470)",
    data: [
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
      { code: "470-10", name: "Security Deposits", opening: 500000, paid: 50000, recovered: 0, balance: 550000 },
    ]
  },
  b20: {
    title: "Schedule B-20: Miscellaneous Expendiyure (to the extent not written off) (Code 480)",
    data: [
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
      { code: "480-10", name: "Preliminary Expenses", opening: 300000, paid: 20000, recovered: 0, balance: 320000 },
    ]
  },
 

};

export default function SchedularB() {
  const [activeTab, setActiveTab] = useState("loans");

  const getTotal = (key) => {
    return tableData[activeTab]?.data?.reduce((sum, row) => sum + row[key], 0)?.toLocaleString();
  };

  return (
    <div className="container mx-auto py-8  w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Schedule B Report</h1>

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
          <option value="b1">Municipal (General) Fund B-1 </option>
          <option value="b2">Earmarked Funds B-2</option>
          <option value="b3">Reserves B-3</option>
          <option value="b4">Grants & Condition for Specific Purposes B-4</option>
          <option value="b5">Secured Loans B-5 </option>
          <option value="b6">Unsecured Loans B-6</option>
          <option value="b7">Deposits Received B-7</option>
          <option value="b8">Deposits Works  B-8</option>
          <option value="b9">Other Liabilites (Sundry Creditors)  B-9</option>
          <option value="b10">Provisions  B-10</option>
          <option value="b11">Fixed Assets B-11</option>
          <option value="b12">Investments - General Funds B-12</option>
          <option value="b13">Investments - Other Funds  B-13</option>
          <option value="b14">Stock in Hand (Incentories) B-14</option>
          <option value="b15">Sundry Debtors (Receivables)  B-15</option>
          <option value="b16">Prepaid Expenses  B-16</option>
          <option value="b17">Cash and Bank Balances  B-17</option>
          <option value="b18">Loans , Advances and deposits  B-18</option>
          <option value="b18a">Accumulated Provisions against Loans, Advances, and Deposits  B-18a</option>
          <option value="b19">Other Assets  B-19</option>
          <option value="b20">Miscellaneous Expendiyure (to the extent not written off) B-20</option>
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
                <th className="border border-gray-300 p-2 text-center">Opening Balance</th>
                <th className="border border-gray-300 p-2 text-center">Paid During Year</th>
                <th className="border border-gray-300 p-2 text-center">Recovered During Year</th>
                <th className="border border-gray-300 p-2 text-center">Balance at Year End</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {tableData[activeTab]?.data?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="border border-gray-300 p-2 text-center">{row?.code}</td>
                  <td className="border border-gray-300 p-2">{row?.name}</td>
                  <td className="border border-gray-300 p-2 text-right">{row?.opening?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{row?.paid?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{row?.recovered?.toLocaleString()}</td>
                  <td className="border border-gray-300 p-2 text-right">{row?.balance?.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan={2} className="border border-gray-300 p-2 text-right">Total</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("opening")}</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("paid")}</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("recovered")}</td>
                <td className="border border-gray-300 p-2 text-right">{getTotal("balance")}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
