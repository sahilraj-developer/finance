import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeSubsidiaryLedger from "./income-subsidiary-ledger";
import ExpenseSubsidiaryLedger from "./expense-subsidiary-ledger";

export default function Home() {
  return (
    <div className="container ">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Function wise Subsidiary  Ledger
      </h1>

      <Tabs defaultValue="income">
        <div className="w-full overflow-x-auto">
          <TabsList className="w-max min-w-full flex flex-nowrap md:flex-wrap gap-2 mb-6">
            <TabsTrigger value="income">Income Ledger (gen-33)</TabsTrigger>
            <TabsTrigger value="expense">Expense Ledger(gen-34)</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-4">
          <TabsContent value="income">
            <IncomeSubsidiaryLedger />
          </TabsContent>
          <TabsContent value="expense">
            <ExpenseSubsidiaryLedger />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
