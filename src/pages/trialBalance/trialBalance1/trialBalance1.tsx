"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// import Filter from "@/Components/Common/Filter/Filter"

// Assuming you have a Filter component similar to the one imported in the balance sheet
// If not, I'll create a simple one
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

export default function TrialBalanceReport() {
  const [activeTab, setActiveTab] = useState("tb1")

  // Sample data structure for trial balance
  const tableData = {
    tb1: {
      title: "DHANBAD MUNICIPAL CORPORATION (2012-2013)",
      period: "1-Apr-2012 to 31-Mar-2013",
      data: [
        {
          section: "3 - Capital Receipts & Liabilities",
          isHeader: true,
        },
        {
          code: "310",
          name: "Municipal (General) Fund",
          openingBalance: { amount: 1195779072.0, type: "Cr" },
          debit: 227274577.7,
          credit: 589800279.0,
          closingBalance: { amount: 1558304773.3, type: "Cr" },
        },
        {
          code: "310",
          name: "Municipal Fund",
          indent: 1,
          openingBalance: { amount: 1012752275.0, type: "Cr" },
          debit: null,
          credit: null,
          closingBalance: { amount: 1012752275.0, type: "Cr" },
        },
        {
          code: "312",
          name: "Reserve Funds",
          openingBalance: { amount: 1012752275.0, type: "Cr" },
          debit: null,
          credit: null,
          closingBalance: { amount: 1012752275.0, type: "Cr" },
        },
        {
          code: "31210",
          name: "Capital Contribution",
          indent: 1,
          openingBalance: null,
          debit: 489297.7,
          credit: 33945957.0,
          closingBalance: { amount: 33456659.3, type: "Cr" },
        },
        {
          code: "31210-01",
          name: "Capital Contribution",
          indent: 2,
          openingBalance: null,
          debit: 489297.7,
          credit: 33945957.0,
          closingBalance: { amount: 33456659.3, type: "Cr" },
        },
        {
          code: "320",
          name: "Grants, Contribution for Specific Purposes",
          openingBalance: { amount: 146506183.0, type: "Cr" },
          debit: 141442761.0,
          credit: 475034140.0,
          closingBalance: { amount: 479794562.0, type: "Cr" },
        },
        {
          code: "32010",
          name: "Central Government",
          indent: 1,
          openingBalance: { amount: 9927130.0, type: "Cr" },
          debit: 2607797.0,
          credit: 6784542.0,
          closingBalance: { amount: 13503875.0, type: "Cr" },
        },
        {
          code: "",
          name: "Central Allotment(NULM)",
          indent: 2,
          openingBalance: null,
          debit: null,
          credit: 2934542.0,
          closingBalance: { amount: 2934542.0, type: "Cr" },
        },
        {
          code: "",
          name: "Central Allotment(RAY)",
          indent: 2,
          openingBalance: null,
          debit: 2607797.0,
          credit: 3250000.0,
          closingBalance: { amount: 642203.0, type: "Cr" },
        },
        {
          code: "",
          name: "Grant From Central Government",
          indent: 2,
          openingBalance: { amount: 9927130.0, type: "Cr" },
          debit: null,
          credit: null,
          closingBalance: { amount: 9927130.0, type: "Cr" },
        },
        {
          code: "32020",
          name: "State Government",
          indent: 1,
          openingBalance: { amount: 136579053.0, type: "Cr" },
          debit: 138637964.0,
          credit: 468849598.0,
          closingBalance: { amount: 466290687.0, type: "Cr" },
        },
        {
          code: "",
          name: "Grant From State Government",
          indent: 2,
          openingBalance: { amount: 136579053.0, type: "Cr" },
          debit: 20000000.0,
          credit: null,
          closingBalance: { amount: 116579053.0, type: "Cr" },
        },
        {
          code: "",
          name: "Received for B.L.C",
          indent: 2,
          openingBalance: null,
          debit: 8370402.0,
          credit: 10756100.0,
          closingBalance: { amount: 2445698.0, type: "Cr" },
        },
        {
          code: "",
          name: "Received For Labour Wages",
          indent: 2,
          openingBalance: null,
          debit: 3516728.0,
          credit: 3516728.0,
          closingBalance: null,
        },
        {
          code: "",
          name: "State Allotment(Amrut/Salary)",
          indent: 2,
          openingBalance: null,
          debit: 32163307.0,
          credit: 38186284.0,
          closingBalance: { amount: 6024777.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Beautification)",
          indent: 2,
          openingBalance: null,
          debit: 487268.0,
          credit: 25456624.0,
          closingBalance: { amount: 24969356.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(C.E.O)",
          indent: 2,
          openingBalance: null,
          debit: 2676749.0,
          credit: 3423500.0,
          closingBalance: { amount: 746751.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Civil Concession)",
          indent: 2,
          openingBalance: null,
          debit: 2924261.0,
          credit: 88013068.0,
          closingBalance: { amount: 85088807.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(D.E.O)",
          indent: 2,
          openingBalance: null,
          debit: null,
          credit: 2000000.0,
          closingBalance: { amount: 2000000.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(D.P.R)",
          indent: 2,
          openingBalance: null,
          debit: null,
          credit: 2000000.0,
          closingBalance: { amount: 2000000.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Drain)",
          indent: 2,
          openingBalance: null,
          debit: 4551691.0,
          credit: 108664297.0,
          closingBalance: { amount: 104112606.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Equipment)",
          indent: 2,
          openingBalance: null,
          debit: 2977360.0,
          credit: 13471221.0,
          closingBalance: { amount: 10593861.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment For Salary(E.R)",
          indent: 2,
          openingBalance: null,
          debit: 4848000.0,
          credit: 4848000.0,
          closingBalance: null,
        },
        {
          code: "",
          name: "State Allotment For S.J.S.R.Y",
          indent: 2,
          openingBalance: null,
          debit: 4789512.0,
          credit: 23981105.0,
          closingBalance: { amount: 19191593.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment (Handpump)",
          indent: 2,
          openingBalance: null,
          debit: 1278806.0,
          credit: 4658936.0,
          closingBalance: { amount: 3380130.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment (Library)",
          indent: 2,
          openingBalance: null,
          debit: 13099782.0,
          credit: 26458196.0,
          closingBalance: { amount: 13358414.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Road)",
          indent: 2,
          openingBalance: null,
          debit: 22315839.0,
          credit: 77385239.0,
          closingBalance: { amount: 55069400.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Training)",
          indent: 2,
          openingBalance: null,
          debit: null,
          credit: 1000000.0,
          closingBalance: { amount: 1000000.0, type: "Cr" },
        },
        {
          code: "",
          name: "State Allotment(Water MADA)",
          indent: 2,
          openingBalance: null,
          debit: 15000000.0,
          credit: 15000000.0,
          closingBalance: null,
        },
        {
          code: "340",
          name: "Deposits Received",
          openingBalance: { amount: 7558645.0, type: "Cr" },
          debit: 1830686.0,
          credit: 1836521.0,
          closingBalance: { amount: 7764477.0, type: "Cr" },
        },
        {
          code: "34010",
          name: "From Contractors/suppliers",
          indent: 1,
          openingBalance: { amount: 6777403.0, type: "Cr" },
          debit: 1830686.0,
          credit: 1569003.0,
          closingBalance: { amount: 6715717.0, type: "Cr" },
        },
        {
          code: "",
          name: "Deposit Rec. From Contractor",
          indent: 2,
          openingBalance: { amount: 6777403.0, type: "Cr" },
          debit: 1830686.0,
          credit: 1569003.0,
          closingBalance: { amount: 6715717.0, type: "Cr" },
        },
      ],
    },
    tb2: {
      title: "DHANBAD MUNICIPAL CORPORATION (2011-2012)",
      period: "1-Apr-2011 to 31-Mar-2012",
      data: [
        {
          section: "3 - Capital Receipts & Liabilities",
          isHeader: true,
        },
        {
          code: "310",
          name: "Municipal (General) Fund",
          openingBalance: { amount: 1095779072.0, type: "Cr" },
          debit: 127274577.7,
          credit: 489800279.0,
          closingBalance: { amount: 1458304773.3, type: "Cr" },
        },
        {
          code: "310",
          name: "Municipal Fund",
          indent: 1,
          openingBalance: { amount: 912752275.0, type: "Cr" },
          debit: null,
          credit: null,
          closingBalance: { amount: 912752275.0, type: "Cr" },
        },
        {
          code: "312",
          name: "Reserve Funds",
          openingBalance: { amount: 912752275.0, type: "Cr" },
          debit: null,
          credit: null,
          closingBalance: { amount: 912752275.0, type: "Cr" },
        },
        {
          code: "31210",
          name: "Capital Contribution",
          indent: 1,
          openingBalance: null,
          debit: 389297.7,
          credit: 23945957.0,
          closingBalance: { amount: 23556659.3, type: "Cr" },
        },
        {
          code: "31210-01",
          name: "Capital Contribution",
          indent: 2,
          openingBalance: null,
          debit: 389297.7,
          credit: 23945957.0,
          closingBalance: { amount: 23556659.3, type: "Cr" },
        },
        {
          code: "320",
          name: "Grants, Contribution for Specific Purposes",
          openingBalance: { amount: 136506183.0, type: "Cr" },
          debit: 131442761.0,
          credit: 375034140.0,
          closingBalance: { amount: 379794562.0, type: "Cr" },
        },
        {
          code: "340",
          name: "Deposits Received",
          openingBalance: { amount: 6558645.0, type: "Cr" },
          debit: 1230686.0,
          credit: 1436521.0,
          closingBalance: { amount: 6764477.0, type: "Cr" },
        },
      ],
    },
    tb3: {
      title: "DHANBAD MUNICIPAL CORPORATION (2010-2011)",
      period: "1-Apr-2010 to 31-Mar-2011",
      data: [
        {
          section: "3 - Capital Receipts & Liabilities",
          isHeader: true,
        },
        {
          code: "310",
          name: "Municipal (General) Fund",
          openingBalance: { amount: 995779072.0, type: "Cr" },
          debit: 107274577.7,
          credit: 389800279.0,
          closingBalance: { amount: 1278304773.3, type: "Cr" },
        },
        {
          code: "312",
          name: "Reserve Funds",
          openingBalance: { amount: 812752275.0, type: "Cr" },
          debit: null,
          credit: null,
          closingBalance: { amount: 812752275.0, type: "Cr" },
        },
        {
          code: "320",
          name: "Grants, Contribution for Specific Purposes",
          openingBalance: { amount: 126506183.0, type: "Cr" },
          debit: 121442761.0,
          credit: 275034140.0,
          closingBalance: { amount: 279794562.0, type: "Cr" },
        },
      ],
    },
  }

  // Helper function to format numbers with commas and 2 decimal places
  const formatNumber = (num) => {
    if (num === null || num === undefined) return ""
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Helper function to get indentation based on level
  const getIndent = (level) => {
    if (!level) return ""
    return `pl-${level * 4}`
  }

  return (
    <div className="container mx-auto py-8 w-full">
      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-700 uppercase text-center">{tableData[activeTab].title}</h1>
        <h2 className="text-base font-bold text-gray-700 text-center">Trial Balance</h2>
        <p className="text-sm text-gray-700 text-center">{tableData[activeTab].period}</p>
      </div>

      {/* Dropdown Section */}
      <div className="flex justify-center mb-8">
        <div className="relative w-80">
          <select
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="tb1" selected>
              2012-2013
            </option>
            <option value="tb2">2011-2012</option>
            <option value="tb3">2010-2011</option>
          </select>
        </div>
      </div>

      <Card className="w-full">
        {/* Filter Component */}
        {/* <Filter /> */}

        <CardContent className="p-0 overflow-x-auto">
          <table className=" w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2 text-left font-medium w-1/3">Particulars</th>
                <th colSpan={4} className="border border-gray-400 p-2 text-center font-medium">
                  <div className="text-center font-medium">{tableData[activeTab].title}</div>
                  <div className="text-center font-medium">{tableData[activeTab].period}</div>
                  <div className="grid grid-cols-3 mt-2">
                    <div className="text-center border-t border-gray-400 py-1">
                      Opening
                      <br />
                      Balance
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-center border-t border-l border-gray-400 py-1">Debit</div>
                      <div className="text-center border-t border-l border-gray-400 py-1">Credit</div>
                    </div>
                    <div className="text-center border-t border-l border-gray-400 py-1">
                      Closing
                      <br />
                      Balance
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 p-2">
              {tableData[activeTab].data.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.isHeader ? (
                    <td colSpan={5} className="border border-gray-400 p-2 font-medium">
                      {row.section}
                    </td>
                  ) : (
                    <>
                      <td
                        className={`border border-gray-400 p-2 ${row.indent ? `pl-${row.indent * 4}` : ""} ${!row.code ? "italic" : ""}`}
                      >
                        {row.code && <span>{row.code} - </span>}
                        {row.name}
                      </td>
                      <td className="border border-gray-400 p-2 text-right">
                        {row.openingBalance
                          ? `${formatNumber(row.openingBalance.amount)} ${row.openingBalance.type}`
                          : ""}
                      </td>
                      <td className="border border-gray-400 p-2 text-right">
                        {row.debit !== null ? formatNumber(row.debit) : ""}
                      </td>
                      <td className="border border-gray-400 p-2 text-right">
                        {row.credit !== null ? formatNumber(row.credit) : ""}
                      </td>
                      <td className="border border-gray-400 p-2 text-right">
                        {row.closingBalance
                          ? `${formatNumber(row.closingBalance.amount)} ${row.closingBalance.type}`
                          : ""}
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

