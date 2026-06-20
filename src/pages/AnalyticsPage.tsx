import MainLayout from "../layouts/MainLayout";
import { useTransactions } from "../context/TransactionContext";
import Card from "../components/common/Card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

function AnalyticsPage() {
  const { transactions } = useTransactions();

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const categoryMap: Record<string, number> = {};

  expenseTransactions.forEach((transaction) => {
    if (categoryMap[transaction.category]) {
      categoryMap[transaction.category] += transaction.amount;
    } else {
      categoryMap[transaction.category] = transaction.amount;
    }
  });

  const pieData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalIncome = transactions
    .filter(
      (transaction) => transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter(
      (transaction) => transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const barData = [
    {
      name: "Income",
      amount: totalIncome,
    },
    {
      name: "Expense",
      amount: totalExpenses,
    },
  ];

  const monthlyMap: Record<string, number> = {};

  expenseTransactions.forEach(
    (transaction) => {
      const month = new Date(
        transaction.date
      ).toLocaleString("default", {
        month: "short",
      });

      if (monthlyMap[month]) {
        monthlyMap[month] +=
          transaction.amount;
      } else {
        monthlyMap[month] =
          transaction.amount;
      }
    }
  );

  const lineData = Object.entries(
    monthlyMap
  ).map(([month, amount]) => ({
    month,
    amount,
  }));


  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00C49F",
    "#FFBB28",
  ];

  return (
    <MainLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">
          Analytics
        </h1>

        {/* Expense Breakdown Pie Chart */}

        <Card>
          <h2 className="mb-4 text-xl font-semibold">
            Expense Breakdown
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                        index % COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Income vs Expense Bar Chart */}

        <Card>
          <h2 className="mb-4 text-xl font-semibold">
            Income vs Expense
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-semibold">
            Monthly Spending Trend
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="amount"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;