import type { Transaction } from "../../types/transaction";
import EmptyState from "../common/EmptyState";
import { useTheme } from "../../context/ThemeContext";

interface TransactionListProps {
transactions: Transaction[];
onDeleteTransaction: (id: string) => void;
onEditTransaction: (
transaction: Transaction
) => void;
}

function TransactionList({
transactions,
onDeleteTransaction,
onEditTransaction,
}: TransactionListProps) {
const { theme } = useTheme();

if (transactions.length === 0) {
return ( <EmptyState
     message="No transactions found."
   />
);
}

return (
<div
className={`rounded-xl border overflow-hidden ${
        theme === "light"
          ? "border-vintage-sage bg-white/70"
          : "border-neon-purple bg-[#1A1A1A]"
      }`}
>
{transactions.map((transaction) => (
<div
key={transaction.id}
className={`flex items-center justify-between border-b p-4 last:border-b-0 ${
            theme === "light"
              ? "border-vintage-sage"
              : "border-neon-purple/30"
          }`}
> <div>
<h3
className={`font-medium ${
                theme === "light"
                  ? "text-vintage-navy"
                  : "text-white"
              }`}
>
{transaction.title} </h3>

```
        <p
          className={`text-sm ${
            theme === "light"
              ? "text-gray-500"
              : "text-gray-400"
          }`}
        >
          {transaction.category}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p
          className={
            transaction.type === "income"
              ? "font-semibold text-green-500"
              : "font-semibold text-red-500"
          }
        >
          ₹{transaction.amount}
        </p>

        <button
          onClick={() =>
            onEditTransaction(transaction)
          }
          className="
            rounded-lg
            bg-vintage-brown
            px-3
            py-1
            text-white
            transition
            hover:opacity-90
          "
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDeleteTransaction(
              transaction.id
            )
          }
          className="
            rounded-lg
            border
            border-vintage-brown
            px-3
            py-1
            text-vintage-brown
            transition
            hover:bg-vintage-brown
            hover:text-white
          "
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

);
}

export default TransactionList;
