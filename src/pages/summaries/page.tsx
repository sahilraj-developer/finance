import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BillsRaisedSummary from "./bills-raised-summary"
import DailyCollectionSummary from "./daily-collection-summary"
import DepositsAdjustedSummary from "./deposits-adjusted-summary"

import FeesSummary from "./fees-summary"
import OutstandingLiabilitySummary from "./outstanding-liability-summary"
import RefundsRemissionsSummary from "./refunds-remissions-summary"
import WriteOffsSummary from "./write-offs-summary"

export default function Home() {
  return (
    <div className="container  md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Financial Summary
      </h1>

      <Tabs defaultValue="immovable">
        <div className="w-full overflow-x-auto">
          <TabsList className="w-max min-w-full flex flex-nowrap md:flex-wrap gap-2 mb-6">
            <TabsTrigger value="immovable">Bills Raised Summary (gen - 22)</TabsTrigger>
            <TabsTrigger value="movable">Daily Collection Summary (gen - 12)</TabsTrigger>
            <TabsTrigger value="land">Deposits Adjusted Summary (gen -19)</TabsTrigger>
            <TabsTrigger value="asset">Fees Summary (gen -24)</TabsTrigger>
            <TabsTrigger value="bills">Refunds Remissions Summary (gen -26)</TabsTrigger>
            <TabsTrigger value="advance">Write Offs Summary (gen -27)</TabsTrigger>
            <TabsTrigger value="lighting">Outstanding Liability Summary (gen -28)</TabsTrigger>

            {/* <TabsTrigger value="permanent">Permanent Advances (gen -17)</TabsTrigger>
            <TabsTrigger value="fees">Fees Register (gen -23)</TabsTrigger>
            <TabsTrigger value="refunds">Refunds & Write-offs (gen -25)</TabsTrigger> */}
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="immovable">
            <BillsRaisedSummary />
          </TabsContent>
          <TabsContent value="movable">
            <DailyCollectionSummary />
          </TabsContent>
          <TabsContent value="land">
            <DepositsAdjustedSummary />
          </TabsContent>
          <TabsContent value="asset">
            <FeesSummary />
          </TabsContent>
          <TabsContent value="lighting">
            <OutstandingLiabilitySummary />
          </TabsContent>
          <TabsContent value="bills">
            <RefundsRemissionsSummary />
          </TabsContent>
          <TabsContent value="advance">
            <WriteOffsSummary />
          </TabsContent>
         
        </div>
      </Tabs>
    </div>
  )
}
