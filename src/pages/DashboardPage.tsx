import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/common/SummaryCard";
import { useTransactions } from "../context/TransactionContext";
import { useTheme } from "../context/ThemeContext";



function DashboardPage() {
  const { transactions } =
    useTransactions();

  const { theme } = useTheme();

  const totalIncome =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

  const totalExpenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

  const currentBalance =
    totalIncome - totalExpenses;

  const savings = currentBalance;

  const summaryData = [
    {
      title: "Current Balance",
      amount: `₹${currentBalance}`,
    },
    {
      title: "Monthly Income",
      amount: `₹${totalIncome}`,
    },
    {
      title: "Monthly Expenses",
      amount: `₹${totalExpenses}`,
    },
    {
      title: "Savings",
      amount: `₹${savings}`,
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 mb-8">
        <p
          className="
      text-sm
      uppercase
      tracking-widest
      text-vintage-brown
    "
        >
          Financial Overview
        </p>

        <h1
          className="
      mt-2
      text-5xl
      font-bold
      text-vintage-navy
    "
        >
          Dashboard
        </h1>

        <p
  className={`mt-3 max-w-xl ${
    theme === "light"
      ? "text-gray-600"
      : "text-gray-400"
  }`}
>
          Track spending, savings,
          budgets, and financial goals
          with clarity.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryData.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            amount={item.amount}
          />
        ))}
      </div>
    </MainLayout >
  );
}

export default DashboardPage;