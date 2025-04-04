import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  IndianRupee,
  TrendingUp,
} from "lucide-react";





// const [dashboardData, setDashboardData] = useState(null);
// const [transactions, setTransactions] = useState(null);

// // Simulate a fetch call to get data
// useEffect(() => {
//   // Simulated API endpoint
//   const fetchData = async () => {
//     try {
//       // In a real app, replace this with the actual API URL
//       const response = await fetch("/api/dashboard-data");
      
//       // Simulate data fetching by using local JSON
//       const data = await response.json();

//       // Set the data into state
//       setDashboardData(data.dashboardData);
//       setTransactions(data.transactions);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []);

// if (!dashboardData || !transactions) {
//   return <div>Loading...</div>; // Show loading state until data is available
// }





const data = {
  dashboardData: {
    totalRevenue: {
      amount: 45231.89,
      changePercentage: 20.1,
    },
    totalExpenses: {
      amount: 12234.59,
      changePercentage: -4.5,
    },
    cashBalance: {
      amount: 18453.00,
      changePercentage: 10.2,
    },
    bankBalance: {
      amount: 32987.30,
      changePercentage: 35.2,
    },
  },
  transactions: [
    {
      type: "Revenue Collection",
      date: "2025-04-01",
      amount: 5000,
      change: "increase",
    },
    {
      type: "Expense Payment",
      date: "2025-04-02",
      amount: 3000,
      change: "decrease",
    },
    {
      type: "Revenue Collection",
      date: "2025-04-03",
      amount: 7000,
      change: "increase",
    },
    {
      type: "Expense Payment",
      date: "2025-04-04",
      amount: 2000,
      change: "decrease",
    },
    {
      type: "Revenue Collection",
      date: "2025-04-05",
      amount: 4000,
      change: "increase",
    },
  ],
};

export default function Dashboard() {


  // get 
  // /api/dashboard-data 
  

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Finance Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            ₹
              {data.dashboardData.totalRevenue.amount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                +{data.dashboardData.totalRevenue.changePercentage}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            ₹
              {data.dashboardData.totalExpenses.amount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDown className="mr-1 h-4 w-4" />
                {data.dashboardData.totalExpenses.changePercentage}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            ₹
              {data.dashboardData.cashBalance.amount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                +{data.dashboardData.cashBalance.changePercentage}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            ₹
              {data.dashboardData.bankBalance.amount.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +{data.dashboardData.bankBalance.changePercentage}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Revenue vs Expenses Chart
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last 5 transactions processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.transactions.map((transaction, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`mr-2 h-8 w-8 rounded-full ${
                          transaction.change === "increase" ? "bg-green-100" : "bg-red-100"
                        } flex items-center justify-center`}
                      >
                        {transaction.change === "increase" ? (
                          <ArrowUp className={`h-4 w-4 text-green-500`} />
                        ) : (
                          <ArrowDown className={`h-4 w-4 text-red-500`} />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{transaction.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                      <div
                        className={`${
                          transaction.change === "increase" ? "text-green-500" : "text-red-500"
                        } text-sm font-medium`}
                      >
                        {transaction.change === "increase" ? "+" : "-"}
                        ₹
                        {transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Other tabs (analytics, reports, notifications) remain unchanged */}
      </Tabs>
    </div>
  );
}
