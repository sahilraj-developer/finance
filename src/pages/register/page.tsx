import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImmovableHoldingRegister from "./immovable-holding-register"
import MovableHoldingRegister from "./movable-holding-register"
import LandRegister from "./land-register"

import AssetReplacementRegister from "./asset-replacement-register"
import PublicLightingRegister from "./public-lighting-register"
import BillsForPaymentRegister from "./bills-for-payment-register"
import AdvanceRegister from "./advance-register"
import PermanentAdvanceRegister from "./permanent-advance-register"
import FeesRegister from "./fees-register"
import RefundsRegister from "./refunds-register"

export default function Home() {
  return (
    <div className="container  md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Government Financial Registers
      </h1>

      <Tabs defaultValue="immovable">
        <div className="w-full overflow-x-auto">
          <TabsList className="w-max min-w-full flex flex-nowrap md:flex-wrap gap-2 mb-6">
            <TabsTrigger value="immovable">Immovable Holdings (gen -30)</TabsTrigger>
            <TabsTrigger value="movable">Movable Holdings (gen -31)</TabsTrigger>
            <TabsTrigger value="land">Land Register (gen -32)</TabsTrigger>
            <TabsTrigger value="asset">Asset Replacement (gen -35)</TabsTrigger>
            <TabsTrigger value="lighting">Public Lighting (gen -36)</TabsTrigger>
            <TabsTrigger value="bills">Bills for Payment (gen -13)</TabsTrigger>
            <TabsTrigger value="advance">Advances (gen -16)</TabsTrigger>
            <TabsTrigger value="permanent">Permanent Advances (gen -17)</TabsTrigger>
            <TabsTrigger value="fees">Fees Register (gen -23)</TabsTrigger>
            <TabsTrigger value="refunds">Refunds & Write-offs (gen -25)</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="immovable">
            <ImmovableHoldingRegister />
          </TabsContent>
          <TabsContent value="movable">
            <MovableHoldingRegister />
          </TabsContent>
          <TabsContent value="land">
            <LandRegister />
          </TabsContent>
          <TabsContent value="asset">
            <AssetReplacementRegister />
          </TabsContent>
          <TabsContent value="lighting">
            <PublicLightingRegister />
          </TabsContent>
          <TabsContent value="bills">
            <BillsForPaymentRegister />
          </TabsContent>
          <TabsContent value="advance">
            <AdvanceRegister />
          </TabsContent>
          <TabsContent value="permanent">
            <PermanentAdvanceRegister />
          </TabsContent>
          <TabsContent value="fees">
            <FeesRegister />
          </TabsContent>
          <TabsContent value="refunds">
            <RefundsRegister />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
