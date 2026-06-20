import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import Card from "../components/common/Card";
import { useTheme } from "../context/ThemeContext";

function BudgetPage() {
  const [budget, setBudget] = useState("");

  const { transactions } =
    useTransactions();

  const { theme } = useTheme();

  useEffect(() => {
    const savedBudget =
      localStorage.getItem("budget");

    if (savedBudget) {
      setBudget(savedBudget);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "budget",
      budget
    );
  }, [budget]);

  const expenseTransactions =
    transactions.filter(
      (transaction) =>
        transaction.type === "expense"
    );

  const spentAmount =
    expenseTransactions.reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const remainingBudget =
    Number(budget) - spentAmount;

  const utilizationPercentage =
    Number(budget) > 0
      ? (spentAmount * 100) /
      Number(budget)
      : 0;

  const dailyAverage =
    spentAmount > 0
      ? spentAmount / 30
      : 0;

  const suggestedBudget =
    spentAmount * 1.1;

  const categoryMap: Record<
    string,
    number
  > = {};

  expenseTransactions.forEach(
    (transaction) => {
      categoryMap[
        transaction.category
      ] =
        (categoryMap[
          transaction.category
        ] || 0) +
        transaction.amount;
    }
  );

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Budget Planner
        </h1>

        <input
          type="number"
          placeholder="Enter Monthly Budget"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
          className={`w-full rounded-lg border p-3 ${
            theme === "light"
              ? "border-vintage-sage bg-white text-vintage-navy"
              : "border-neon-purple bg-black text-white"
          }`}
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-gray-500">
              Budget
            </p>

            <h2 className="text-2xl font-bold">
              ₹{budget || 0}
            </h2>
          </Card>

          <Card>
            <p className="text-gray-500">
              Spent
            </p>

            <h2 className="text-2xl font-bold">
              ₹{spentAmount}
            </h2>
          </Card>

          <Card>
            <p className="text-gray-500">
              Remaining
            </p>

            <h2 className="text-2xl font-bold">
              ₹{remainingBudget}
            </h2>
          </Card>
        </div>

        <Card className="mt-6">
          <div className="mb-2 flex justify-between">
            <span>
              Budget Used
            </span>

            <span>
              {utilizationPercentage.toFixed(
                1
              )}
              %
            </span>
          </div>

          <div className="h-4 w-full rounded-full bg-gray-200">
            <div
              className={`h-4 rounded-full transition-all duration-500 ${
                utilizationPercentage < 50
                  ? "bg-green-500"
                  : utilizationPercentage < 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              style={{
                width: `${Math.min(
                  utilizationPercentage,
                  100
                )}%`,
              }}
            />
          </div>

          <div className="mt-4">
            {utilizationPercentage <
              50 && (
                <p className="text-green-500 font-medium">
                  Excellent budget
                  control
                </p>
              )}

            {utilizationPercentage >=
              50 &&
              utilizationPercentage <
              80 && (
                <p className="text-yellow-500 font-medium">
                  Budget usage is
                  moderate
                </p>
              )}

            {utilizationPercentage >=
              80 && (
                <p className="text-red-500 font-medium">
                  Warning: Near
                  budget limit
                </p>
              )}
          </div>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-xl font-semibold">
              Budget Insights
            </h2>

            <p>
              Daily Average:
              ₹
              {dailyAverage.toFixed(
                0
              )}
            </p>

            <p className="mt-2">
              Remaining:
              ₹
              {remainingBudget}
            </p>

            <p className="mt-2">
              Budget Used:
              {utilizationPercentage.toFixed(
                1
              )}
              %
            </p>
          </Card>

          <Card>
            <h2 className="mb-4 text-xl font-semibold">
              Suggested Budget
            </h2>

            <p className="text-gray-500">
              Based on current
              spending
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              ₹
              {suggestedBudget.toFixed(
                0
              )}
            </h2>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="mb-4 text-xl font-semibold">
            Category Spending
          </h2>

          {Object.keys(categoryMap)
            .length === 0 ? (
              <p className="text-gray-500">
                No expenses yet.
              </p>
            ) : (
              Object.entries(
                categoryMap
              ).map(
                ([category, amount]) => (
                  <div
                    key={category}
                    className="mb-3 flex justify-between border-b pb-2"
                  >
                    <span>
                      {category}
                    </span>

                    <span className="font-semibold">
                      ₹{amount}
                    </span>
                  </div>
                )
              )
            )}
        </Card>
      </div>
    </MainLayout>
  );
}

export default BudgetPage;
