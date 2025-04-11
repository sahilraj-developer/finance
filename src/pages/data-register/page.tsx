import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CollectionRegister from "./collection-register"
import SummaryStatementOfDepositAdjusted from "./summary-statement-of-deposit-adjusted"
import ChequeIssueRegister from "./cheque-issue-register"
import DepositRegister from "./deposit-register"
import DemandRegister from "./demand-register"


export default function Home() {
  return (
    <main className="container">
      <h1 className="text-3xl font-bold mb-6"> Finance Management System</h1>

      <Tabs defaultValue="collection" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
          <TabsTrigger value="collection">Collection (gen 11)</TabsTrigger>
          <TabsTrigger value="summary">Summary (gen 14)</TabsTrigger>
          <TabsTrigger value="cheque">Cheque  (gen 15)</TabsTrigger>
          <TabsTrigger value="deposit">Deposit (gen 18)</TabsTrigger>
          <TabsTrigger value="demand">Demand  (gen 20)</TabsTrigger>
        </TabsList>

        <TabsContent value="collection">
          <CollectionRegister />
        </TabsContent>

        <TabsContent value="summary">
          <SummaryStatementOfDepositAdjusted />
        </TabsContent>

        <TabsContent value="cheque">
          <ChequeIssueRegister />
        </TabsContent>

        <TabsContent value="deposit">
          <DepositRegister />
        </TabsContent>

        <TabsContent value="demand">
          <DemandRegister />
        </TabsContent>

      </Tabs>
    </main>
  )
}
