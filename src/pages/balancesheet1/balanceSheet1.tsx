"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
//  import Filter from "@/Components/Common/Filter/Filter";

export default function BalanceSheet() {
  const [activeTab, setActiveTab] = useState("b1")

  // This would be expanded with actual filter functionality
  // const Filter = () => {
  //   return (
  //     <div className="p-4 border-b border-gray-200">
  //       <div className="flex flex-wrap gap-4 justify-between items-center">
  //         <div className="flex gap-4">
  //           <div>
  //             <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
  //               Financial Year
  //             </label>
  //             <select
  //               id="year"
  //               className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             >
  //               <option value="2013">2012-2013</option>
  //               <option value="2012">2011-2012</option>
  //             </select>
  //           </div>
  //           <div>
  //             <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 mb-1">
  //               Quarter
  //             </label>
  //             <select
  //               id="quarter"
  //               className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             >
  //               <option value="all">All</option>
  //               <option value="q1">Q1</option>
  //               <option value="q2">Q2</option>
  //               <option value="q3">Q3</option>
  //               <option value="q4">Q4</option>
  //             </select>
  //           </div>
  //         </div>
  //         <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
  //           Apply Filters
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  const tableData = {
    b1: {
      title: "2024-2025",
      data: [
        // LIABILITIES
        { section: "LIABILITIES", isHeader: true },
        { section: "Reserve & Surplus", isSubHeader: true },
        {
          code: "310",
          name: "Municipal (General) Fund",
          schNo: "B-1",
          currentYear: 1018396541.65,
          previousYear: 1012752275.0,
        },
        { code: "311", name: "Earmarked Funds", schNo: "B-2", currentYear: 0, previousYear: 0 },
        { code: "312", name: "Reserves", schNo: "B-3", currentYear: 33456659.3, previousYear: 0 },
        { name: "Total Reserves & Surplus", isTotal: true, currentYear: 1051853200.95, previousYear: 1012752275.0 },

        {
          code: "320",
          name: "Grants, Contributions for specific purposes",
          schNo: "B-4",
          currentYear: 479794562.0,
          previousYear: 146206183.0,
        },

        { section: "Loans", isSubHeader: true },
        { code: "330", name: "Secured Loans", schNo: "B-5", currentYear: 0, previousYear: 0 },
        { code: "331", name: "Unsecured Loans", schNo: "B-6", currentYear: 0, previousYear: 0 },
        { name: "Total Loans", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Liabilities and Provisions", isSubHeader: true },
        { code: "340", name: "Deposits Received", schNo: "B-7", currentYear: 7764477.0, previousYear: 7558645.0 },
        { code: "341", name: "Deposit works", schNo: "B-8", currentYear: 0, previousYear: 0 },
        {
          code: "350",
          name: "Other Liabilities (Sundry Creditors)",
          schNo: "B-9",
          currentYear: 27041498.0,
          previousYear: 29260969.0,
        },
        { code: "360", name: "Provisions", schNo: "B-10", currentYear: 0, previousYear: 0 },
        {
          name: "Total Current Liabilities and Provisions",
          isTotal: true,
          currentYear: 34805975.0,
          previousYear: 36819614.0,
        },

        { name: "TOTAL LIABILITIES", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },

        // ASSETS
        { section: "ASSETS", isHeader: true },
        { section: "Fixed Assets", isSubHeader: true },
        { code: "410", name: "Gross Block", schNo: "B-11", currentYear: 8277257.0, previousYear: 1419.0 },
        { code: "411", name: "Less: Accumulated Depreciation", currentYear: 621920.7, previousYear: 0 },
        { name: "Net Block", currentYear: 7655336.3, previousYear: 1419.0 },
        { code: "412", name: "Capital Work-in-Progress", currentYear: 84976846.0, previousYear: 57603422.0 },
        { name: "Total Fixed Assets", isTotal: true, currentYear: 92630182.3, previousYear: 57604841.0 },

        { section: "Investments", isSubHeader: true },
        { code: "420", name: "Investment - General Fund", schNo: "B-12", currentYear: 0, previousYear: 0 },
        { code: "421", name: "Investments - Other Funds", schNo: "B-13", currentYear: 0, previousYear: 0 },
        { name: "Total Investments", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Assets, Loans and Advances", isSubHeader: true },
        { code: "430", name: "Stock in Hand (Inventories)", schNo: "B-14", currentYear: 0, previousYear: 0 },
        { name: "Sundry Debtors (Receivables)", isSubSubHeader: true },
        {
          code: "431",
          name: "Gross amount outstanding",
          schNo: "B-15",
          currentYear: 43929136.11,
          previousYear: 47416182.0,
          indent: true,
        },
        {
          code: "432",
          name: "Less: Accumulated provision against bad and doubtful",
          currentYear: 0,
          previousYear: 0,
          indent: true,
        },
        { name: "Net amount outstanding", currentYear: 43929136.11, previousYear: 47416182.0, indent: true },
        { code: "440", name: "Prepaid Expenses", schNo: "B-16", currentYear: 0, previousYear: 0 },
        {
          code: "450",
          name: "Cash and Bank Balances",
          schNo: "B-17",
          currentYear: 1422205994.54,
          previousYear: 1090757049.0,
        },
        { code: "460", name: "Loans, advances and deposits", schNo: "B-18", currentYear: 7688425.0, previousYear: 0 },
        { code: "461", name: "Less: Accumulated provisions against Loans", currentYear: 0, previousYear: 0 },
        { name: "Net Amount outstanding", currentYear: 7688425.0, previousYear: 0 },
        {
          name: "Total Current Assets, Loans & Advances",
          isTotal: true,
          currentYear: 1473823555.65,
          previousYear: 1138173231.0,
        },

        { code: "470", name: "Other Assets", schNo: "B-19", currentYear: 0, previousYear: 0 },
        {
          code: "480",
          name: "Miscellaneous Expenditure (to the extent not written off)",
          schNo: "B-20",
          currentYear: 0,
          previousYear: 0,
        },

        { name: "TOTAL ASSETS", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },
      ],
    },
    // You could add other schedules here
    b2: {
      title: "2023-2034",
      data: [
        // LIABILITIES
        { section: "LIABILITIES", isHeader: true },
        

        { section: "Loans", isSubHeader: true },
        { code: "330", name: "Secured Loans", schNo: "B-5", currentYear: 0, previousYear: 0 },
        { code: "331", name: "Unsecured Loans", schNo: "B-6", currentYear: 0, previousYear: 0 },
        { name: "Total Loans", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Liabilities and Provisions", isSubHeader: true },
        { code: "340", name: "Deposits Received", schNo: "B-7", currentYear: 7764477.0, previousYear: 7558645.0 },
        { code: "341", name: "Deposit works", schNo: "B-8", currentYear: 0, previousYear: 0 },
        {
          code: "350",
          name: "Other Liabilities (Sundry Creditors)",
          schNo: "B-9",
          currentYear: 27041498.0,
          previousYear: 29260969.0,
        },
        { code: "360", name: "Provisions", schNo: "B-10", currentYear: 0, previousYear: 0 },
        {
          name: "Total Current Liabilities and Provisions",
          isTotal: true,
          currentYear: 34805975.0,
          previousYear: 36819614.0,
        },

        { name: "TOTAL LIABILITIES", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },

        // ASSETS
        { section: "ASSETS", isHeader: true },
        { section: "Fixed Assets", isSubHeader: true },
        { code: "410", name: "Gross Block", schNo: "B-11", currentYear: 8277257.0, previousYear: 1419.0 },
        { code: "411", name: "Less: Accumulated Depreciation", currentYear: 621920.7, previousYear: 0 },
        { name: "Net Block", currentYear: 7655336.3, previousYear: 1419.0 },
        { code: "412", name: "Capital Work-in-Progress", currentYear: 84976846.0, previousYear: 57603422.0 },
        { name: "Total Fixed Assets", isTotal: true, currentYear: 92630182.3, previousYear: 57604841.0 },

        { section: "Investments", isSubHeader: true },
        { code: "420", name: "Investment - General Fund", schNo: "B-12", currentYear: 0, previousYear: 0 },
        { code: "421", name: "Investments - Other Funds", schNo: "B-13", currentYear: 0, previousYear: 0 },
        { name: "Total Investments", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Assets, Loans and Advances", isSubHeader: true },
        { code: "430", name: "Stock in Hand (Inventories)", schNo: "B-14", currentYear: 0, previousYear: 0 },
        { name: "Sundry Debtors (Receivables)", isSubSubHeader: true },
        {
          code: "431",
          name: "Gross amount outstanding",
          schNo: "B-15",
          currentYear: 43929136.11,
          previousYear: 47416182.0,
          indent: true,
        },
        {
          code: "432",
          name: "Less: Accumulated provision against bad and doubtful",
          currentYear: 0,
          previousYear: 0,
          indent: true,
        },
        { name: "Net amount outstanding", currentYear: 43929136.11, previousYear: 47416182.0, indent: true },
        { code: "440", name: "Prepaid Expenses", schNo: "B-16", currentYear: 0, previousYear: 0 },
        {
          code: "450",
          name: "Cash and Bank Balances",
          schNo: "B-17",
          currentYear: 1422205994.54,
          previousYear: 1090757049.0,
        },
        { code: "460", name: "Loans, advances and deposits", schNo: "B-18", currentYear: 7688425.0, previousYear: 0 },
        { code: "461", name: "Less: Accumulated provisions against Loans", currentYear: 0, previousYear: 0 },
        { name: "Net Amount outstanding", currentYear: 7688425.0, previousYear: 0 },
        {
          name: "Total Current Assets, Loans & Advances",
          isTotal: true,
          currentYear: 1473823555.65,
          previousYear: 1138173231.0,
        },

        { code: "470", name: "Other Assets", schNo: "B-19", currentYear: 0, previousYear: 0 },
        {
          code: "480",
          name: "Miscellaneous Expenditure (to the extent not written off)",
          schNo: "B-20",
          currentYear: 0,
          previousYear: 0,
        },

        { name: "TOTAL ASSETS", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },
      ],
    },
    b3: {
      title: "2022-2023",
      data: [
        // LIABILITIES
        { section: "LIABILITIES", isHeader: true },
        { section: "Reserve & Surplus", isSubHeader: true },
        {
          code: "310",
          name: "Municipal (General) Fund",
          schNo: "B-1",
          currentYear: 1018396541.65,
          previousYear: 1012752275.0,
        },
        { code: "311", name: "Earmarked Funds", schNo: "B-2", currentYear: 0, previousYear: 0 },
        { code: "312", name: "Reserves", schNo: "B-3", currentYear: 33456659.3, previousYear: 0 },
        { name: "Total Reserves & Surplus", isTotal: true, currentYear: 1051853200.95, previousYear: 1012752275.0 },

        {
          code: "320",
          name: "Grants, Contributions for specific purposes",
          schNo: "B-4",
          currentYear: 479794562.0,
          previousYear: 146206183.0,
        },

        { section: "Loans", isSubHeader: true },
        { code: "330", name: "Secured Loans", schNo: "B-5", currentYear: 0, previousYear: 0 },
        { code: "331", name: "Unsecured Loans", schNo: "B-6", currentYear: 0, previousYear: 0 },
        { name: "Total Loans", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Liabilities and Provisions", isSubHeader: true },
        { code: "340", name: "Deposits Received", schNo: "B-7", currentYear: 7764477.0, previousYear: 7558645.0 },
        { code: "341", name: "Deposit works", schNo: "B-8", currentYear: 0, previousYear: 0 },
        {
          code: "350",
          name: "Other Liabilities (Sundry Creditors)",
          schNo: "B-9",
          currentYear: 27041498.0,
          previousYear: 29260969.0,
        },
        { code: "360", name: "Provisions", schNo: "B-10", currentYear: 0, previousYear: 0 },
        {
          name: "Total Current Liabilities and Provisions",
          isTotal: true,
          currentYear: 34805975.0,
          previousYear: 36819614.0,
        },

        { name: "TOTAL LIABILITIES", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },

        // ASSETS
        { section: "ASSETS", isHeader: true },
        

        { section: "Current Assets, Loans and Advances", isSubHeader: true },
        { code: "430", name: "Stock in Hand (Inventories)", schNo: "B-14", currentYear: 0, previousYear: 0 },
        { name: "Sundry Debtors (Receivables)", isSubSubHeader: true },
        {
          code: "431",
          name: "Gross amount outstanding",
          schNo: "B-15",
          currentYear: 43929136.11,
          previousYear: 47416182.0,
          indent: true,
        },
        {
          code: "432",
          name: "Less: Accumulated provision against bad and doubtful",
          currentYear: 0,
          previousYear: 0,
          indent: true,
        },
        { name: "Net amount outstanding", currentYear: 43929136.11, previousYear: 47416182.0, indent: true },
        { code: "440", name: "Prepaid Expenses", schNo: "B-16", currentYear: 0, previousYear: 0 },
        {
          code: "450",
          name: "Cash and Bank Balances",
          schNo: "B-17",
          currentYear: 1422205994.54,
          previousYear: 1090757049.0,
        },
        { code: "460", name: "Loans, advances and deposits", schNo: "B-18", currentYear: 7688425.0, previousYear: 0 },
        { code: "461", name: "Less: Accumulated provisions against Loans", currentYear: 0, previousYear: 0 },
        { name: "Net Amount outstanding", currentYear: 7688425.0, previousYear: 0 },
        {
          name: "Total Current Assets, Loans & Advances",
          isTotal: true,
          currentYear: 1473823555.65,
          previousYear: 1138173231.0,
        },

        { code: "470", name: "Other Assets", schNo: "B-19", currentYear: 0, previousYear: 0 },
        {
          code: "480",
          name: "Miscellaneous Expenditure (to the extent not written off)",
          schNo: "B-20",
          currentYear: 0,
          previousYear: 0,
        },

        { name: "TOTAL ASSETS", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },
      ],
    },
    b4: {
      title: "2021-2022",
      data: [
        // LIABILITIES
        { section: "LIABILITIES", isHeader: true },
        

        { section: "Loans", isSubHeader: true },
        { code: "330", name: "Secured Loans", schNo: "B-5", currentYear: 0, previousYear: 0 },
        { code: "331", name: "Unsecured Loans", schNo: "B-6", currentYear: 0, previousYear: 0 },
        { name: "Total Loans", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Liabilities and Provisions", isSubHeader: true },
        { code: "340", name: "Deposits Received", schNo: "B-7", currentYear: 7764477.0, previousYear: 7558645.0 },
        { code: "341", name: "Deposit works", schNo: "B-8", currentYear: 0, previousYear: 0 },
        {
          code: "350",
          name: "Other Liabilities (Sundry Creditors)",
          schNo: "B-9",
          currentYear: 27041498.0,
          previousYear: 29260969.0,
        },
        { code: "360", name: "Provisions", schNo: "B-10", currentYear: 0, previousYear: 0 },
        {
          name: "Total Current Liabilities and Provisions",
          isTotal: true,
          currentYear: 34805975.0,
          previousYear: 36819614.0,
        },
        { section: "Reserve & Surplus", isSubHeader: true },
        {
          code: "310",
          name: "Municipal (General) Fund",
          schNo: "B-1",
          currentYear: 1018396541.65,
          previousYear: 1012752275.0,
        },
        { code: "311", name: "Earmarked Funds", schNo: "B-2", currentYear: 0, previousYear: 0 },
        { code: "312", name: "Reserves", schNo: "B-3", currentYear: 33456659.3, previousYear: 0 },
        { name: "Total Reserves & Surplus", isTotal: true, currentYear: 1051853200.95, previousYear: 1012752275.0 },

        {
          code: "320",
          name: "Grants, Contributions for specific purposes",
          schNo: "B-4",
          currentYear: 479794562.0,
          previousYear: 146206183.0,
        },

        { name: "TOTAL LIABILITIES", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },

        // ASSETS
        { section: "ASSETS", isHeader: true },
        { section: "Fixed Assets", isSubHeader: true },
        { code: "410", name: "Gross Block", schNo: "B-11", currentYear: 8277257.0, previousYear: 1419.0 },
        { code: "411", name: "Less: Accumulated Depreciation", currentYear: 621920.7, previousYear: 0 },
        { name: "Net Block", currentYear: 7655336.3, previousYear: 1419.0 },
        { code: "412", name: "Capital Work-in-Progress", currentYear: 84976846.0, previousYear: 57603422.0 },
        { name: "Total Fixed Assets", isTotal: true, currentYear: 92630182.3, previousYear: 57604841.0 },

        { section: "Investments", isSubHeader: true },
        { code: "420", name: "Investment - General Fund", schNo: "B-12", currentYear: 0, previousYear: 0 },
        { code: "421", name: "Investments - Other Funds", schNo: "B-13", currentYear: 0, previousYear: 0 },
        { name: "Total Investments", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Assets, Loans and Advances", isSubHeader: true },
        { code: "430", name: "Stock in Hand (Inventories)", schNo: "B-14", currentYear: 0, previousYear: 0 },
        { name: "Sundry Debtors (Receivables)", isSubSubHeader: true },
        {
          code: "431",
          name: "Gross amount outstanding",
          schNo: "B-15",
          currentYear: 43929136.11,
          previousYear: 47416182.0,
          indent: true,
        },
        {
          code: "432",
          name: "Less: Accumulated provision against bad and doubtful",
          currentYear: 0,
          previousYear: 0,
          indent: true,
        },
        { name: "Net amount outstanding", currentYear: 43929136.11, previousYear: 47416182.0, indent: true },
        { code: "440", name: "Prepaid Expenses", schNo: "B-16", currentYear: 0, previousYear: 0 },
        {
          code: "450",
          name: "Cash and Bank Balances",
          schNo: "B-17",
          currentYear: 1422205994.54,
          previousYear: 1090757049.0,
        },
        { code: "460", name: "Loans, advances and deposits", schNo: "B-18", currentYear: 7688425.0, previousYear: 0 },
        { code: "461", name: "Less: Accumulated provisions against Loans", currentYear: 0, previousYear: 0 },
        { name: "Net Amount outstanding", currentYear: 7688425.0, previousYear: 0 },
        {
          name: "Total Current Assets, Loans & Advances",
          isTotal: true,
          currentYear: 1473823555.65,
          previousYear: 1138173231.0,
        },

        { code: "470", name: "Other Assets", schNo: "B-19", currentYear: 0, previousYear: 0 },
        {
          code: "480",
          name: "Miscellaneous Expenditure (to the extent not written off)",
          schNo: "B-20",
          currentYear: 0,
          previousYear: 0,
        },

        { name: "TOTAL ASSETS", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },
      ],
    },
    b5: {
      title: "2020-2021",
      data: [
        // LIABILITIES
        { section: "LIABILITIES", isHeader: true },
        

        

        { section: "Current Liabilities and Provisions", isSubHeader: true },
        { code: "340", name: "Deposits Received", schNo: "B-7", currentYear: 7764477.0, previousYear: 7558645.0 },
        { code: "341", name: "Deposit works", schNo: "B-8", currentYear: 0, previousYear: 0 },
        {
          code: "350",
          name: "Other Liabilities (Sundry Creditors)",
          schNo: "B-9",
          currentYear: 27041498.0,
          previousYear: 29260969.0,
        },
        { code: "360", name: "Provisions", schNo: "B-10", currentYear: 0, previousYear: 0 },
        {
          name: "Total Current Liabilities and Provisions",
          isTotal: true,
          currentYear: 34805975.0,
          previousYear: 36819614.0,
        },
        { section: "Loans", isSubHeader: true },
        { code: "330", name: "Secured Loans", schNo: "B-5", currentYear: 0, previousYear: 0 },
        { code: "331", name: "Unsecured Loans", schNo: "B-6", currentYear: 0, previousYear: 0 },
        { name: "Total Loans", isTotal: true, currentYear: 0, previousYear: 0 },

        { name: "TOTAL LIABILITIES", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },

        // ASSETS
        { section: "ASSETS", isHeader: true },
        { section: "Fixed Assets", isSubHeader: true },
        { code: "410", name: "Gross Block", schNo: "B-11", currentYear: 8277257.0, previousYear: 1419.0 },
        { code: "411", name: "Less: Accumulated Depreciation", currentYear: 621920.7, previousYear: 0 },
        { name: "Net Block", currentYear: 7655336.3, previousYear: 1419.0 },
        { code: "412", name: "Capital Work-in-Progress", currentYear: 84976846.0, previousYear: 57603422.0 },
        { name: "Total Fixed Assets", isTotal: true, currentYear: 92630182.3, previousYear: 57604841.0 },

        { section: "Investments", isSubHeader: true },
        { code: "420", name: "Investment - General Fund", schNo: "B-12", currentYear: 0, previousYear: 0 },
        { code: "421", name: "Investments - Other Funds", schNo: "B-13", currentYear: 0, previousYear: 0 },
        { name: "Total Investments", isTotal: true, currentYear: 0, previousYear: 0 },

        { section: "Current Assets, Loans and Advances", isSubHeader: true },
        { code: "430", name: "Stock in Hand (Inventories)", schNo: "B-14", currentYear: 0, previousYear: 0 },
        { name: "Sundry Debtors (Receivables)", isSubSubHeader: true },
        {
          code: "431",
          name: "Gross amount outstanding",
          schNo: "B-15",
          currentYear: 43929136.11,
          previousYear: 47416182.0,
          indent: true,
        },
        {
          code: "432",
          name: "Less: Accumulated provision against bad and doubtful",
          currentYear: 0,
          previousYear: 0,
          indent: true,
        },
        { name: "Net amount outstanding", currentYear: 43929136.11, previousYear: 47416182.0, indent: true },
        { code: "440", name: "Prepaid Expenses", schNo: "B-16", currentYear: 0, previousYear: 0 },
        {
          code: "450",
          name: "Cash and Bank Balances",
          schNo: "B-17",
          currentYear: 1422205994.54,
          previousYear: 1090757049.0,
        },
        { code: "460", name: "Loans, advances and deposits", schNo: "B-18", currentYear: 7688425.0, previousYear: 0 },
        { code: "461", name: "Less: Accumulated provisions against Loans", currentYear: 0, previousYear: 0 },
        { name: "Net Amount outstanding", currentYear: 7688425.0, previousYear: 0 },
        {
          name: "Total Current Assets, Loans & Advances",
          isTotal: true,
          currentYear: 1473823555.65,
          previousYear: 1138173231.0,
        },

        { code: "470", name: "Other Assets", schNo: "B-19", currentYear: 0, previousYear: 0 },
        {
          code: "480",
          name: "Miscellaneous Expenditure (to the extent not written off)",
          schNo: "B-20",
          currentYear: 0,
          previousYear: 0,
        },

        { name: "TOTAL ASSETS", isSectionTotal: true, currentYear: 1566453737.95, previousYear: 1195778072.0 },
      ],
    },
  }

  const getTotal = (field) => {
    if (!tableData[activeTab]?.data) return 0
    return tableData[activeTab].data
      .filter((row) => !row.isHeader && !row.isSubHeader && !row.isSubSubHeader)
      .reduce((sum, row) => sum + (row[field] || 0), 0)
      .toLocaleString()
  }

  return (
    <div className="container mx-auto py-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Balance Sheet</h1>

      {/* Dropdown Section */}
      <div className="flex justify-center mb-8">
        <div className="relative w-80">
          <select
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="b1" selected>
              2024-2025            </option>
            <option value="b2">2023-2024</option>
            <option value="b3">2022-2023</option>
            <option value="b4">2021-2022</option>
            <option value="b5">2020-2021</option>
           
          </select>
        </div>
      </div>

      <Card className="w-full">
        {/* <CardHeader className="bg-slate-50">
          <CardTitle className="text-center text-lg font-semibold">{tableData[activeTab]?.title}</CardTitle>
        </CardHeader> */}

        {/* Filters */}
        {/* <Filter /> */}
        {/* <Filter /> */}

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th rowSpan={2} className="border border-gray-300 p-2 text-center w-20">
                  Code No.
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 text-center">
                  Particulars
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 text-center w-24">
                  Sch. No.
                </th>
                <th className="border border-gray-300 p-2 text-center">Current Year Amount</th>
                <th className="border border-gray-300 p-2 text-center">Previous Year Amount</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
                <th className="border border-gray-300 p-2 text-center">(Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {tableData[activeTab]?.data?.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  {row.isHeader ? (
                    <>
                      <td className="border border-gray-300 p-2"></td>
                      <td colSpan={4} className="border border-gray-300 p-2 font-bold">
                        {row.section}
                      </td>
                    </>
                  ) : row.isSubHeader ? (
                    <>
                      <td className="border border-gray-300 p-2"></td>
                      <td colSpan={4} className="border border-gray-300 p-2 font-bold pl-4">
                        {row.section}
                      </td>
                    </>
                  ) : row.isSubSubHeader ? (
                    <>
                      <td className="border border-gray-300 p-2"></td>
                      <td colSpan={4} className="border border-gray-300 p-2 pl-4">
                        {row.name}
                      </td>
                    </>
                  ) : row.isSectionTotal ? (
                    <>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2 font-bold">{row.name}</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2 text-right font-bold">
                        {row.currentYear?.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border border-gray-300 p-2 text-right font-bold">
                        {row.previousYear?.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </>
                  ) : row.isTotal ? (
                    <>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2 italic pl-4">{row.name}</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2 text-right">
                        {row.currentYear?.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {row.previousYear?.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 p-2 text-center">{row.code || ""}</td>
                      <td className="border border-gray-300 p-2 pl-4">{row.indent ? "  " + row.name : row.name}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.schNo || ""}</td>
                      <td className="border border-gray-300 p-2 text-right">
                        {row.currentYear !== undefined
                          ? row.currentYear.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                      <td className="border border-gray-300 p-2 text-right">
                        {row.previousYear !== undefined
                          ? row.previousYear.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "-"}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

