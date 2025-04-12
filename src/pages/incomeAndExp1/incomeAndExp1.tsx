"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
//  import Filter from "@/Components/Common/Filter/Filter";

export default function IncomeExpenditureAccount() {
  const [activeTab, setActiveTab] = useState("incomeExpenditure1")

  // Filter component
//   const Filter = () => {
//     return (
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex flex-wrap gap-4 justify-between items-center">
//           <div className="flex gap-4">
//             <div>
//               <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
//                 Financial Year
//               </label>
//               <select
//                 id="year"
//                 className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="2013">2012-2013</option>
//                 <option value="2012">2011-2012</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 mb-1">
//                 Quarter
//               </label>
//               <select
//                 id="quarter"
//                 className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="all">All</option>
//                 <option value="q1">Q1</option>
//                 <option value="q2">Q2</option>
//                 <option value="q3">Q3</option>
//                 <option value="q4">Q4</option>
//               </select>
//             </div>
//           </div>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     )
//   }

  const tableData = {
    incomeExpenditure1: {
      title: "2024-2025",
      data: [
        // Header row
        { col1: "1", col2: "2", col3: "3", col4: "4", col5: "5", isHeaderRow: true },

        // INCOME
        { section: "INCOME", isHeader: true },
        { code: "110", name: "Tax Revenue", schNo: "I-1", currentYear: 26903958.0, previousYear: "-" },
        { code: "120", name: "Assigned Revenues & Compensation", schNo: "I-2", currentYear: "-", previousYear: "-" },
        {
          code: "130",
          name: "Rental Income from Municipal Properties",
          schNo: "I-3",
          currentYear: 1399464.29,
          previousYear: "-",
        },
        { code: "140", name: "Fees & User Charges", schNo: "I-4", currentYear: 6076057.04, previousYear: "-" },
        { code: "150", name: "Sale & Hire Charges", schNo: "I-5", currentYear: "-", previousYear: "-" },
        {
          code: "160",
          name: "Revenue Grants, Contributions & Subsidies",
          schNo: "I-6",
          currentYear: 103141101.7,
          previousYear: "-",
        },
        { code: "170", name: "Income from Investments", schNo: "I-7", currentYear: "-", previousYear: "-" },
        { code: "171", name: "Interest Earned", schNo: "I-8", currentYear: 9489249.0, previousYear: "-" },
        { code: "180", name: "Other Income", schNo: "I-9", currentYear: 6275.33, previousYear: "-" },
        { code: "A", name: "Total - INCOME", isSectionTotal: true, currentYear: 147006105.36, previousYear: "-" },

        // EXPENDITURE
        { section: "EXPENDITURE", isHeader: true },
        { code: "210", name: "Establishment Expenses", schNo: "I-10", currentYear: 22959620.0, previousYear: "-" },
        { code: "220", name: "Administrative Expenses", schNo: "I-11", currentYear: 5687273.0, previousYear: "-" },
        { code: "230", name: "Operations & Maintenance", schNo: "I-12", currentYear: 7078576.0, previousYear: "-" },
        { code: "240", name: "Interest & Finance Expenses", schNo: "I-13", currentYear: 536.01, previousYear: "-" },
        { code: "250", name: "Programme Expenses", schNo: "I-14", currentYear: 1500000.0, previousYear: "-" },
        {
          code: "260",
          name: "Revenue Grants, Contributions & subsidies",
          schNo: "I-15",
          currentYear: 102651804.0,
          previousYear: "-",
        },
        { code: "270", name: "Provisions & Write off", schNo: "I-16", currentYear: "-", previousYear: "-" },
        { code: "271", name: "Miscellaneous Expenses", schNo: "I-17", currentYear: 860109.0, previousYear: "-" },
        { code: "272", name: "Depreciation", currentYear: 623920.7, previousYear: "-" },
        { code: "B", name: "Total - EXPENDITURE", isSectionTotal: true, currentYear: 141361838.71, previousYear: "-" },

        // Surplus/Deficit
        {
          code: "A-B",
          name: "Gross surplus/ (deficit) of income over expenditure before Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "280", name: "Add: Prior period Items (Net)", schNo: "I-18", currentYear: "-", previousYear: "-" },
        {
          name: "Gross surplus/ (deficit) of income over expenditure after Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "290", name: "Less: Transfer to Reserve Funds", currentYear: "-", previousYear: "-" },
        {
          name: "Net balance being surplus/ deficit carried over to Municipal Fund",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
      ],
    },
    incomeExpenditure2: {
      title: "2024-2025",
      data: [
        // Header row
        { col1: "1", col2: "2", col3: "3", col4: "4", col5: "5", isHeaderRow: true },

        // INCOME
        { section: "INCOME", isHeader: true },
        { code: "110", name: "Tax Revenue", schNo: "I-1", currentYear: 26903958.0, previousYear: "-" },
        { code: "120", name: "Assigned Revenues & Compensation", schNo: "I-2", currentYear: "-", previousYear: "-" },
        {
          code: "130",
          name: "Rental Income from Municipal Properties",
          schNo: "I-3",
          currentYear: 1399464.29,
          previousYear: "-",
        },
        { code: "140", name: "Fees & User Charges", schNo: "I-4", currentYear: 6076057.04, previousYear: "-" },
        { code: "150", name: "Sale & Hire Charges", schNo: "I-5", currentYear: "-", previousYear: "-" },
        {
          code: "160",
          name: "Revenue Grants, Contributions & Subsidies",
          schNo: "I-6",
          currentYear: 103141101.7,
          previousYear: "-",
        },
        { code: "170", name: "Income from Investments", schNo: "I-7", currentYear: "-", previousYear: "-" },
        { code: "171", name: "Interest Earned", schNo: "I-8", currentYear: 9489249.0, previousYear: "-" },
        { code: "180", name: "Other Income", schNo: "I-9", currentYear: 6275.33, previousYear: "-" },
        { code: "A", name: "Total - INCOME", isSectionTotal: true, currentYear: 147006105.36, previousYear: "-" },

        // EXPENDITURE
        { section: "EXPENDITURE", isHeader: true },
        { code: "210", name: "Establishment Expenses", schNo: "I-10", currentYear: 22959620.0, previousYear: "-" },
        { code: "220", name: "Administrative Expenses", schNo: "I-11", currentYear: 5687273.0, previousYear: "-" },
        { code: "230", name: "Operations & Maintenance", schNo: "I-12", currentYear: 7078576.0, previousYear: "-" },
        { code: "240", name: "Interest & Finance Expenses", schNo: "I-13", currentYear: 536.01, previousYear: "-" },
        { code: "250", name: "Programme Expenses", schNo: "I-14", currentYear: 1500000.0, previousYear: "-" },
        {
          code: "260",
          name: "Revenue Grants, Contributions & subsidies",
          schNo: "I-15",
          currentYear: 102651804.0,
          previousYear: "-",
        },
        { code: "270", name: "Provisions & Write off", schNo: "I-16", currentYear: "-", previousYear: "-" },
        { code: "271", name: "Miscellaneous Expenses", schNo: "I-17", currentYear: 860109.0, previousYear: "-" },
        { code: "272", name: "Depreciation", currentYear: 623920.7, previousYear: "-" },
        { code: "B", name: "Total - EXPENDITURE", isSectionTotal: true, currentYear: 141361838.71, previousYear: "-" },

        // Surplus/Deficit
        {
          code: "A-B",
          name: "Gross surplus/ (deficit) of income over expenditure before Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "280", name: "Add: Prior period Items (Net)", schNo: "I-18", currentYear: "-", previousYear: "-" },
        {
          name: "Gross surplus/ (deficit) of income over expenditure after Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "290", name: "Less: Transfer to Reserve Funds", currentYear: "-", previousYear: "-" },
        {
          name: "Net balance being surplus/ deficit carried over to Municipal Fund",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
      ],
    },
    incomeExpenditure3: {
      title: "2024-2025",
      data: [
        // Header row
        { col1: "1", col2: "2", col3: "3", col4: "4", col5: "5", isHeaderRow: true },

        // INCOME
        { section: "INCOME", isHeader: true },
        { code: "110", name: "Tax Revenue", schNo: "I-1", currentYear: 26903958.0, previousYear: "-" },
        { code: "120", name: "Assigned Revenues & Compensation", schNo: "I-2", currentYear: "-", previousYear: "-" },
        {
          code: "130",
          name: "Rental Income from Municipal Properties",
          schNo: "I-3",
          currentYear: 1399464.29,
          previousYear: "-",
        },
        { code: "140", name: "Fees & User Charges", schNo: "I-4", currentYear: 6076057.04, previousYear: "-" },
        { code: "150", name: "Sale & Hire Charges", schNo: "I-5", currentYear: "-", previousYear: "-" },
        {
          code: "160",
          name: "Revenue Grants, Contributions & Subsidies",
          schNo: "I-6",
          currentYear: 103141101.7,
          previousYear: "-",
        },
        { code: "170", name: "Income from Investments", schNo: "I-7", currentYear: "-", previousYear: "-" },
        { code: "171", name: "Interest Earned", schNo: "I-8", currentYear: 9489249.0, previousYear: "-" },
        { code: "180", name: "Other Income", schNo: "I-9", currentYear: 6275.33, previousYear: "-" },
        { code: "A", name: "Total - INCOME", isSectionTotal: true, currentYear: 147006105.36, previousYear: "-" },

        // EXPENDITURE
        { section: "EXPENDITURE", isHeader: true },
        { code: "210", name: "Establishment Expenses", schNo: "I-10", currentYear: 22959620.0, previousYear: "-" },
        { code: "220", name: "Administrative Expenses", schNo: "I-11", currentYear: 5687273.0, previousYear: "-" },
        { code: "230", name: "Operations & Maintenance", schNo: "I-12", currentYear: 7078576.0, previousYear: "-" },
        { code: "240", name: "Interest & Finance Expenses", schNo: "I-13", currentYear: 536.01, previousYear: "-" },
        { code: "250", name: "Programme Expenses", schNo: "I-14", currentYear: 1500000.0, previousYear: "-" },
        {
          code: "260",
          name: "Revenue Grants, Contributions & subsidies",
          schNo: "I-15",
          currentYear: 102651804.0,
          previousYear: "-",
        },
        { code: "270", name: "Provisions & Write off", schNo: "I-16", currentYear: "-", previousYear: "-" },
        { code: "271", name: "Miscellaneous Expenses", schNo: "I-17", currentYear: 860109.0, previousYear: "-" },
        { code: "272", name: "Depreciation", currentYear: 623920.7, previousYear: "-" },
        { code: "B", name: "Total - EXPENDITURE", isSectionTotal: true, currentYear: 141361838.71, previousYear: "-" },

        // Surplus/Deficit
        {
          code: "A-B",
          name: "Gross surplus/ (deficit) of income over expenditure before Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "280", name: "Add: Prior period Items (Net)", schNo: "I-18", currentYear: "-", previousYear: "-" },
        {
          name: "Gross surplus/ (deficit) of income over expenditure after Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "290", name: "Less: Transfer to Reserve Funds", currentYear: "-", previousYear: "-" },
        {
          name: "Net balance being surplus/ deficit carried over to Municipal Fund",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
      ],
    },
    incomeExpenditure4: {
      title: "2024-2025",
      data: [
        // Header row
        { col1: "1", col2: "2", col3: "3", col4: "4", col5: "5", isHeaderRow: true },

        // INCOME
        { section: "INCOME", isHeader: true },
        { code: "110", name: "Tax Revenue", schNo: "I-1", currentYear: 26903958.0, previousYear: "-" },
        { code: "120", name: "Assigned Revenues & Compensation", schNo: "I-2", currentYear: "-", previousYear: "-" },
        {
          code: "130",
          name: "Rental Income from Municipal Properties",
          schNo: "I-3",
          currentYear: 1399464.29,
          previousYear: "-",
        },
        { code: "140", name: "Fees & User Charges", schNo: "I-4", currentYear: 6076057.04, previousYear: "-" },
        { code: "150", name: "Sale & Hire Charges", schNo: "I-5", currentYear: "-", previousYear: "-" },
        {
          code: "160",
          name: "Revenue Grants, Contributions & Subsidies",
          schNo: "I-6",
          currentYear: 103141101.7,
          previousYear: "-",
        },
        { code: "170", name: "Income from Investments", schNo: "I-7", currentYear: "-", previousYear: "-" },
        { code: "171", name: "Interest Earned", schNo: "I-8", currentYear: 9489249.0, previousYear: "-" },
        { code: "180", name: "Other Income", schNo: "I-9", currentYear: 6275.33, previousYear: "-" },
        { code: "A", name: "Total - INCOME", isSectionTotal: true, currentYear: 147006105.36, previousYear: "-" },

        // EXPENDITURE
        { section: "EXPENDITURE", isHeader: true },
        { code: "210", name: "Establishment Expenses", schNo: "I-10", currentYear: 22959620.0, previousYear: "-" },
        { code: "220", name: "Administrative Expenses", schNo: "I-11", currentYear: 5687273.0, previousYear: "-" },
        { code: "230", name: "Operations & Maintenance", schNo: "I-12", currentYear: 7078576.0, previousYear: "-" },
        { code: "240", name: "Interest & Finance Expenses", schNo: "I-13", currentYear: 536.01, previousYear: "-" },
        { code: "250", name: "Programme Expenses", schNo: "I-14", currentYear: 1500000.0, previousYear: "-" },
        {
          code: "260",
          name: "Revenue Grants, Contributions & subsidies",
          schNo: "I-15",
          currentYear: 102651804.0,
          previousYear: "-",
        },
        { code: "270", name: "Provisions & Write off", schNo: "I-16", currentYear: "-", previousYear: "-" },
        { code: "271", name: "Miscellaneous Expenses", schNo: "I-17", currentYear: 860109.0, previousYear: "-" },
        { code: "272", name: "Depreciation", currentYear: 623920.7, previousYear: "-" },
        { code: "B", name: "Total - EXPENDITURE", isSectionTotal: true, currentYear: 141361838.71, previousYear: "-" },

        // Surplus/Deficit
        {
          code: "A-B",
          name: "Gross surplus/ (deficit) of income over expenditure before Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "280", name: "Add: Prior period Items (Net)", schNo: "I-18", currentYear: "-", previousYear: "-" },
        {
          name: "Gross surplus/ (deficit) of income over expenditure after Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "290", name: "Less: Transfer to Reserve Funds", currentYear: "-", previousYear: "-" },
        {
          name: "Net balance being surplus/ deficit carried over to Municipal Fund",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
      ],
    },
    incomeExpenditure5: {
      title: "2024-2025",
      data: [
        // Header row
        { col1: "1", col2: "2", col3: "3", col4: "4", col5: "5", isHeaderRow: true },

        // INCOME
        { section: "INCOME", isHeader: true },
        { code: "110", name: "Tax Revenue", schNo: "I-1", currentYear: 26903958.0, previousYear: "-" },
        { code: "120", name: "Assigned Revenues & Compensation", schNo: "I-2", currentYear: "-", previousYear: "-" },
        {
          code: "130",
          name: "Rental Income from Municipal Properties",
          schNo: "I-3",
          currentYear: 1399464.29,
          previousYear: "-",
        },
        { code: "140", name: "Fees & User Charges", schNo: "I-4", currentYear: 6076057.04, previousYear: "-" },
        { code: "150", name: "Sale & Hire Charges", schNo: "I-5", currentYear: "-", previousYear: "-" },
        {
          code: "160",
          name: "Revenue Grants, Contributions & Subsidies",
          schNo: "I-6",
          currentYear: 103141101.7,
          previousYear: "-",
        },
        { code: "170", name: "Income from Investments", schNo: "I-7", currentYear: "-", previousYear: "-" },
        { code: "171", name: "Interest Earned", schNo: "I-8", currentYear: 9489249.0, previousYear: "-" },
        { code: "180", name: "Other Income", schNo: "I-9", currentYear: 6275.33, previousYear: "-" },
        { code: "A", name: "Total - INCOME", isSectionTotal: true, currentYear: 147006105.36, previousYear: "-" },

        // EXPENDITURE
        { section: "EXPENDITURE", isHeader: true },
        { code: "210", name: "Establishment Expenses", schNo: "I-10", currentYear: 22959620.0, previousYear: "-" },
        { code: "220", name: "Administrative Expenses", schNo: "I-11", currentYear: 5687273.0, previousYear: "-" },
        { code: "230", name: "Operations & Maintenance", schNo: "I-12", currentYear: 7078576.0, previousYear: "-" },
        { code: "240", name: "Interest & Finance Expenses", schNo: "I-13", currentYear: 536.01, previousYear: "-" },
        { code: "250", name: "Programme Expenses", schNo: "I-14", currentYear: 1500000.0, previousYear: "-" },
        {
          code: "260",
          name: "Revenue Grants, Contributions & subsidies",
          schNo: "I-15",
          currentYear: 102651804.0,
          previousYear: "-",
        },
        { code: "270", name: "Provisions & Write off", schNo: "I-16", currentYear: "-", previousYear: "-" },
        { code: "271", name: "Miscellaneous Expenses", schNo: "I-17", currentYear: 860109.0, previousYear: "-" },
        { code: "272", name: "Depreciation", currentYear: 623920.7, previousYear: "-" },
        { code: "B", name: "Total - EXPENDITURE", isSectionTotal: true, currentYear: 141361838.71, previousYear: "-" },

        // Surplus/Deficit
        {
          code: "A-B",
          name: "Gross surplus/ (deficit) of income over expenditure before Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "280", name: "Add: Prior period Items (Net)", schNo: "I-18", currentYear: "-", previousYear: "-" },
        {
          name: "Gross surplus/ (deficit) of income over expenditure after Prior Period Items",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
        { code: "290", name: "Less: Transfer to Reserve Funds", currentYear: "-", previousYear: "-" },
        {
          name: "Net balance being surplus/ deficit carried over to Municipal Fund",
          isItalic: true,
          currentYear: 5644266.65,
          previousYear: "-",
        },
      ],
    },
    // You could add other reports here
  }

  return (
    <div className="container mx-auto py-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Reports</h1>

      {/* Dropdown Section */}
      <div className="flex justify-center mb-8">
        <div className="relative w-80">
          <select
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="incomeExpenditure1" selected>
              2024-2025
            </option>
            <option value="incomeExpenditure2">2023-2024</option>
            <option value="incomeExpenditure3">2022-2023</option>
            <option value="incomeExpenditure4">2021-2022</option>
            <option value="incomeExpenditure5">2020-2021</option>
          </select>
        </div>
      </div>

      <Card className="w-full">
        {/* <CardHeader className="bg-slate-50">
          <CardTitle className="text-center text-lg font-semibold">{tableData[activeTab]?.title}</CardTitle>
        </CardHeader> */}

        {/* Filters */}
        {/* <Filter/> */}
        {/* <Filter/> */}

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center w-20">Code No</th>
                <th className="border border-gray-300 p-2 text-center">Item/ Head of Account</th>
                <th className="border border-gray-300 p-2 text-center w-24">Sch. No</th>
                <th className="border border-gray-300 p-2 text-center">
                  Current Year
                  <br />
                  (Rs.)
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  Previous Year
                  <br />
                  (Rs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData[activeTab]?.data?.map((row, index) => {
                if (row.isHeaderRow) {
                  return (
                    <tr key={index} className="bg-gray-100 text-center">
                      <td className="border border-gray-300 p-2">{row.col1}</td>
                      <td className="border border-gray-300 p-2">{row.col2}</td>
                      <td className="border border-gray-300 p-2">{row.col3}</td>
                      <td className="border border-gray-300 p-2">{row.col4}</td>
                      <td className="border border-gray-300 p-2">{row.col5}</td>
                    </tr>
                  )
                }

                return (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    {row.isHeader ? (
                      <>
                        <td className="border border-gray-300 p-2"></td>
                        <td colSpan={4} className="border border-gray-300 p-2 font-bold">
                          {row.section}
                        </td>
                      </>
                    ) : row.isSectionTotal ? (
                      <>
                        <td className="border border-gray-300 p-2 text-center font-bold">{row.code}</td>
                        <td className="border border-gray-300 p-2 font-bold">{row.name}</td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2 text-right font-bold">
                          {typeof row.currentYear === "number"
                            ? row.currentYear.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : row.currentYear}
                        </td>
                        <td className="border border-gray-300 p-2 text-right font-bold">{row.previousYear}</td>
                      </>
                    ) : row.isItalic ? (
                      <>
                        <td className="border border-gray-300 p-2 text-center">{row.code || ""}</td>
                        <td className="border border-gray-300 p-2 italic">{row.name}</td>
                        <td className="border border-gray-300 p-2 text-center">{row.schNo || ""}</td>
                        <td className="border border-gray-300 p-2 text-right italic">
                          {typeof row.currentYear === "number"
                            ? row.currentYear.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : row.currentYear}
                        </td>
                        <td className="border border-gray-300 p-2 text-right italic">{row.previousYear}</td>
                      </>
                    ) : (
                      <>
                        <td className="border border-gray-300 p-2 text-center">{row.code || ""}</td>
                        <td className="border border-gray-300 p-2">{row.name}</td>
                        <td className="border border-gray-300 p-2 text-center">{row.schNo || ""}</td>
                        <td className="border border-gray-300 p-2 text-right">
                          {typeof row.currentYear === "number"
                            ? row.currentYear.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : row.currentYear}
                        </td>
                        <td className="border border-gray-300 p-2 text-right">{row.previousYear}</td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

